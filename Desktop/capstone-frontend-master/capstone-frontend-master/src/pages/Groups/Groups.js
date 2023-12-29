import * as React from 'react';
import '../../tmp.css'

import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import TextContainer from './TextContainer';
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';

export default function Groups() {
  const [clientId] = React.useState(Math.floor(new Date().getTime() / 1000));
  const [websckt, setWebsckt] = React.useState();
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([])
  const [readGroup, setReadGroup] = useState({});

  const [chatBody, setChatBody] = useState(''); 
  const { groupid } = useParams();
  const user_id = useUser().uid;
 
  useEffect(() => {
    const url = `ws://3.34.108.172/ws/${clientId}`;
    const ws = new WebSocket(url);
    ws.onopen = () => ws.send(JSON.stringify({ type: 'connect' }));
    console.log('connect');

    ws.onmessage = function (e) {
      const message = e.data;
      console.log("Received Message", message);

      const data = JSON.parse(message);
      // console.log(data, [...messages, data]);
      // setMessages([...messages, data]);
      setMessages(prevMessages => [...prevMessages , data]); 
      console.log("Received Messages", messages);

    };
    ws.onopen = () => ws.send(JSON.stringify({ type: 'connect' }));
    setWebsckt(ws);

    return () => ws.close();
  }, [clientId]);

  useEffect(() => {
    axios.get(`http://3.34.108.172/group/${groupid}`).then((res) => 
    {setReadGroup(res.data);
    });
    axios.get(`http://3.34.108.172/chat/`).then((res) => {
      setMessages(res.data);
    });
  }, [groupid, messages]); // messages를 의존성 배열에 추가



  useEffect(() => {
    axios.get(`http://3.34.108.172/group/participants?group_id=${groupid}`).then((res) =>
      setUsers(res.data)
    );
  }, []);


  const sendMessage = () => {
    const offset = new Date().getTimezoneOffset() * 60000;
    
    axios.post(`http://3.34.108.172/chat/new?group_id=${groupid}&writer_id=${user_id}`, {
      body: chatBody,
      time: new Date(Date.now() - offset)
    })
    .then((res) => {
      console.log("채팅 전송 완료");
      setMessages(prevMessages => [...prevMessages , res.data]); 
      
      // 채팅 입력 필드 초기화
      setMessage('');
      setChatBody('');
      
      // 웹소켓으로 메시지 전송
      if (websckt && websckt.readyState === WebSocket.OPEN) {
        websckt.send(JSON.stringify({ message: chatBody }));
        console.log({chatBody});
      }
    })
    .catch((error) => {
      console.error("채팅 오류:", error);
    });
    
  };

  return (
    <div style={{width:'100%', height:'80%'}}>
      <div style={{display:'flex'}}>
      <h3 style={{width:'50%'}}>{readGroup.info}</h3>
      <h4 style={{textAlign:'right', width:'50%'}}>your client id: {clientId} </h4>
      </div>
      <div className="chat-outerContainer">
        <div className="Container">
          <InfoBar room={readGroup.title}/>
          <Messages messages={messages.filter(message => message.group_id === readGroup.id )} name={user_id} />
          <Input message={message} setMessage={setMessage} onChange={setChatBody} sendMessage={sendMessage}/>
        </div>
        <Box sx={{height:'100%', width:'30%', background:'#F5F5F5', borderRadius:'0 4px 4px 0'}}>
          <TextContainer users={users}></TextContainer>
        </Box>
      </div>
    </div>
  );
}