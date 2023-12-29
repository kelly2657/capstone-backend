import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const Input = ({ onChange, setMessage, sendMessage, message }) => (
  <Box 
    component="form"
    sx={{display:'flex', '& .MuiTextField-root': { m: 1, width: '25ch' }}}>
   
    <TextField
      variant="standard"
      size='Normal'
      style={{width:'100%'}}
      type="text"
      placeholder="전송하려는 메시지를 입력하세요."
      value={message}
      // onChange={(event) => setMessage(event.target.value)}
      onChange ={(event) => setMessage(onChange(event.target.value))}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <Button 
      variant="contained" 
      onClick={e => sendMessage(e)}>
      전송
    </Button>
  </Box>
);

export default Input;
