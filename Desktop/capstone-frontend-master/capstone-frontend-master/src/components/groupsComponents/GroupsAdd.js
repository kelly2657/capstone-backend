import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Button, Box, Modal, Typography, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import useUser from '../../hooks/useUser';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    textAlign: 'center'
  };

export default function GroupsAdd ()  {
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [open, setOpen] = useState(false);
    const modalOpen = () => setOpen(true);
    const modalClose = () => setOpen(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const user = useUser();

    const creator_id = useUser().uid;

    const createGroups = () => {
        const GroupData = {
            title : roomName,
            info : roomDescription
        };
    
        axios.post(`http://3.34.108.172/group/new?creator_id=${creator_id}`, GroupData)
        .then((res) => {
            console.log(res.data)
            window.location.href = `/g/${res.data.id}`;
        })
        .catch((error) => {
            console.error('그룹 생성 중 오류가 발생했습니다 : ', error);
        });
    
    
      }
    return (
        <div style={{textAlign:"end", width:'50%'}} >
        <Button style={{height:'40px'}} size='large' startIcon={<AddCircleIcon /> } onClick={() => modalOpen()}>
          <h3>ADD GROUP</h3>
        </Button>
        <Modal
              open={open}
              onClose={modalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                  그룹 생성
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, color:'red' }}>{errorMessage}</Typography>
                <Box sx={{alignItems: 'flex-end', m:1 }}>
                  <KeyboardArrowRightIcon sx={{ color: 'action.active', mr: 1, my: -3.5, fontSize: '30px'}} />
                  <TextField
                  // id="input-with-sx" 
                  required
                  label="채팅방 이름"
                  variant='standard'
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                </Box>
                <Box sx={{alignItems: 'flex-end', m:1 }}>
                  
                  <KeyboardArrowRightIcon sx={{ color: '#F2F2F2', mr: 1, my: -3.5, fontSize: '30px'}} />
                  <TextField
                  // id="input-with-sx" 
                  label="채팅방 소개"
                  variant='standard'
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                />
                </Box>
                <Box sx={{ '& button': { m: 2 } }}>
                <Link
                  // 페이지간 이동
                  onClick={(e) => {
                    if (!roomName) {
                      setErrorMessage('채팅방 이름을 입력하세요.');
                      e.preventDefault();
                    } else if (!roomDescription) {
                      setRoomDescription(`${roomName}`);
                    } else {
                      createGroups();
                    }
                  }}
                >
                  <Button variant="contained"  size="large" >
                    ENTER
                  </Button>
                </Link>
                </Box>
              </Box>
        </Modal>
      </div>


    );
  }

