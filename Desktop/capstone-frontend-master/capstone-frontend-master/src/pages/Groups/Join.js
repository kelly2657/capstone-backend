import React, {useState} from 'react';
import {Link} from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Join() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      height: '100%',
      alignItems: 'center'
    }}>
      
      <div>
      {/* <Box sx={{alignItems: 'flex-end', m:1 }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: -3.5, fontSize: '30px' }} />
        <TextField 
          id="input-with-sx" 
          label="이름" 
          variant="standard"
          onChange={(event)=>setName(event.target.value)} />
      </Box> */}
      <Box sx={{alignItems: 'flex-end', m:1 }}>
        <SupervisedUserCircleIcon sx={{ color: 'action.active', mr: 1, my: -3.5, fontSize: '30px'}} />
        <TextField 
          id="input-with-sx" 
          label="채팅방" 
          variant="standard"
          onChange={(event)=>setRoom(event.target.value)} />
      </Box>
      <Box sx={{ '& button': { m: 2 } }}>
        <Link
          // 페이지간 이동
          onClick={(e) => (!room ? e.preventDefault() : null)}
          to={`/g/${room}`}
        >
          <Button variant="contained" color="success" size="large">
            ENTER
          </Button>
        </Link>
        </Box>
      </div>
    </div>
  );
}

export default Join;