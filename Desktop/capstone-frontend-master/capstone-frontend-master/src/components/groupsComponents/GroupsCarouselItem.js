import React,{useState, useEffect} from 'react';
import '../../main.css';
import { Button,IconButton, Box, Modal, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import axios from 'axios';
import useUser from '../../hooks/useUser';
// import useParticipant from '../../hooks/useParticipant'
// import useCreator from '../../hooks/useCreator'


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
export default function GroupCarouselItem({group}) {
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  // const participant = useParticipant()
  // const creator = useParticipant()
  const participant= true;
  
  const [creator, setCreator] = useState('');
  const [isPart, setPart] = useState('');
  const [isToggle, setToggle] = useState(false);
  const [guest ,setGuest] = useState()

  const user = useUser().uid; 

  const isCreator = user === creator;

  const [showIcon, setShowIcon] = useState(false);
  const [chatRoomName, setChatRoomName] = useState('채팅방 이름'); 
  
  const getPart = async () => {
    const res_participation = await axios.get(`http://3.34.108.172/user/participation/${user}`)
    // console.log('이것은', group)
    const foo = res_participation.data.filter(v => v.id === group.id).length
    setPart(foo)
  }


  useEffect(() => {
    if (group) {
        getPart()
        setChatRoomName(group.title); 
        setCreator(group.creator_id);
        console.log(group.title, isCreator, isPart)
    }
}, [group]);


  const handleMouseEnter = () => {
    setShowIcon(true);
  };

  const handleMouseLeave = () => {
    setShowIcon(false);
  };


  // 그룹 삭제
  const deleteGroup = () => {
    if (isCreator) {
        axios.delete(`http://3.34.108.172/group/delete/${group.id}`)    
        .then((res) => {
            window.location.reload();
        }).catch((error) => {
          console.error('그룹 삭제 중 오류가 발생했습니다:', error);
        });
      } else {
        console.log("생성자가 아닙니다. 그룹을 삭제할 수 없습니다.");
      }
    };

    const 그룹참가 = async (g, u) => {
      console.log(`유저 ${u}를 그룹 ${g}에 초대합니다.`);
      await axios.get(`http://3.34.108.172/group/invite/?group_id=${g}&user_id=${u}`);
      window.location.reload();
    }

    const onGuestHandler = (event) => {
      setGuest(event.currentTarget.value);
    }

    const onInviteSubmitHandler = (event) => {
      event.preventDefault();
      그룹참가(group.id, guest);
    }

  return (
    <div className="groups-carousel-item">

      <Button className="groups-carousel-item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showIcon ? (
          <Box sx={{alignItems: 'center',m:1, display:'flex', color: 'white'}}>
          <IconButton onClick={() => modalOpen()}
           disabled={!participant} style={!participant ? { pointerEvents: 'none' } : {}}><MoreVertIcon sx={{fontSize:'30px'}}/></IconButton>
          <Modal
                open={open}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>

                    {isPart ? (
                      <>
                        <Button variant="contained"  size="large" style={{width:'200px', marginBottom:'10px'}} onClick={() => setToggle(!isToggle)}>
                          초대하기
                        </Button>
                        <div style={{display: (isToggle ? "block" : "none")}}>
                          <form onSubmit={onInviteSubmitHandler}>
                            <TextField
                              id='guest'
                              // required
                              label="초대"
                              // placeholder={data?.info}
                              defaultValue={guest}
                              type='search'
                              onChange={onGuestHandler}
                              variant="standard"
                            />
                            <Button type='submit' style={{marginTop:'10px'}} >
                              GO
                            </Button>
                            
                          </form>
                        </div>
                        {!isCreator && (
                          <Button variant="contained"  size="large" style={{width:'200px', marginBottom:'10px'}}>
                            탈퇴하기
                          </Button>   
                        )}
                      </>
                    ) : (
                      <Button variant="contained"  size="large" style={{width:'200px', marginBottom:'10px'}} onClick={() => 그룹참가(group.id, user)}>
                        참가하기
                      </Button>
                    )}
                    {isCreator && (
                      <Button variant="contained"  size="large" disabled={!isCreator} style={!participant ? { pointerEvents: 'none', width: '200px' } : { width: '200px' }} onClick={deleteGroup}>
                        삭제하기
                      </Button>
                    )}
                </Box>
          </Modal>
          {/* <Tooltip title="채팅방 참여자만 가능합니다."> */}
          {isPart ? (
            <IconButton href={`/g/${group.id}`}  disabled={!participant} style={!participant ? { pointerEvents: 'none' } : {}}><ModeCommentIcon sx={{fontSize:'30px'}} /></IconButton>     
          ) : (<></>)}
          {/* </Tooltip> */}
        </Box>
        ) : (
          <h4>{chatRoomName}</h4>
        )}
      </Button>
    </div>
  );
}
