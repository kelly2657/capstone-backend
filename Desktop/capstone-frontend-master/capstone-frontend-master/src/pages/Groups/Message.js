import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';
import { useState, useEffect } from 'react';
import axios from 'axios';
function Message({ message: { writer_id, body }, name }) {
  
  const [senderName, setSenderName] = useState('');

  useEffect(() => {
    if (writer_id === name) {
      axios.get(`http://3.34.108.172/user/${name}`)
        .then((res) => setSenderName(res.data.name))
        .catch((error) => console.error('사용자 정보를 가져오는 중 오류 발생:', error));
    } else {
      axios.get(`http://3.34.108.172/user/${writer_id}`)
        .then((res) => setSenderName(res.data.name))
        .catch((error) => console.error('사용자 정보를 가져오는 중 오류 발생:', error));
    }
  }, [writer_id, name]);

  let isSentByCurrentUser = false;

  if (writer_id === name) {
    isSentByCurrentUser = true;
  }


  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{senderName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(body)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(body)}</p>
      </div>
      <p className="sentText pl-10 ">{senderName}</p>
    </div>
  );
}

export default Message;
