import {React, useState} from 'react';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import useParticipant from '../../hooks/useParticipant'
// import useCreator from '../../hooks/useCreator'


import {Box, IconButton, Modal, Button} from '@mui/material';
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
function InfoBar({room}) {
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  // const participant = useParticipant()
  // const creator = useParticipant()
  const participant= false;
  const creator = false

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#2979FF',
      height: '60px',
      width: '100%'
    }}>
      <Box sx={{alignItems: 'center', m:1, display:'flex', color: 'white'}}>
        <SupervisedUserCircleIcon sx={{ mr: 1, my: -3.5, fontSize: '30px'}}/>
        <h3 >{room}</h3>
      </Box>
      <Box sx={{alignItems: 'center',m:1, display:'flex', color: 'white'}}>
        <IconButton onClick={() => modalOpen()}
          style={{display : participant ? "block" : "none"}}><MoreVertIcon sx={{fontSize:'30px'}}/></IconButton>
        <Modal
              open={open}
              onClose={modalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                  <Button variant="contained"  size="large" style={{width:'200px', marginBottom:'10px'}}>
                    초대하기
                  </Button>
                  <Button variant="contained"  size="large" style={{width:'200px', marginBottom:'10px'}} >
                    탈퇴하기
                  </Button>
                  <Button variant="contained"  size="large" style={{width:'200px', display : creator ? "block" : "none", marginLeft:'43.5px'}} >
                    삭제하기
                  </Button>
              </Box>
        </Modal>
        <IconButton><CloseIcon sx={{fontSize:'30px'}}/></IconButton>
      </Box>
    </div>
  );
}

export default InfoBar;