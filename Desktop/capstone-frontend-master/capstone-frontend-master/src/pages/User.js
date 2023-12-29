import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileLeft from '../components/profileComponents/ProfileLeft';
import '../main.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Box, Card, CardContent, CardMedia, Typography, Modal, TextField } from '@mui/material';
import useUser from '../hooks/useUser'
import axios from 'axios';

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


export default function Home() {
  const { uid } = useParams();
  const [data, setData] = React.useState();
  const [nothing, setNothing] = React.useState(false);

  const getData = async () => {
    try {
      const res = await axios.get(`http://3.34.108.172/user/${uid}`)
      setData(res.data)
    } catch (err) {
      setNothing(true);
      console.error(err)
    }
  }

  const [roomName, setRoomName] = React.useState('');
  const [roomDescription, setRoomDescription] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const creator_id = useUser().uid;

  const createGroups = () => {
    const GroupData = {
        title : roomName,
        info : roomDescription
    };

    axios.post(`http://3.34.108.172/group/new?creator_id=${creator_id}`, GroupData)
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.error('그룹 생성 중 오류가 발생했습니다 : ', error);
    });

    if (!roomDescription) {
      setRoomDescription(`${roomName}`);
    }
    
    if(!roomName) {
      setErrorMessage('채팅방 이름을 입력하세요.');
    }else {
      setErrorMessage('');
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{textAlign:"end"}} >
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
                  onClick={(e) => (!roomName ? e.preventDefault() : null)}
                  to={`/g/${roomName}`}>
                  <Button variant="contained"  size="large" onClick={createGroups}>
                    ENTER
                  </Button>
                </Link>
                </Box>
              </Box>
        </Modal>
      </div>

      
      <Card sx={{ width: "100%", maxHeight: "50%", marginRight: '16px' , display:'flex'}}>
        {!nothing ? (
          <>
            <CardMedia
              sx={{height:195, width:240, margin:"5px"}}
              image={data?.photo_url || "https://png.pngtree.com/png-vector/20191115/ourmid/pngtree-beautiful-profile-line-vector-icon-png-image_1990469.jpg"}
              title="green iguana"
              style={{boxShadow: "0 0 5px black"}}
            />
            <CardContent sx={{ width: "100%" }}>
              <div style={{display: "flex", flexDirection: "row"}}>
                <Typography gutterBottom variant="h3" component="div">
                  {data?.name}
                </Typography>
              </div>
              <Typography variant="body2">
                [ UID: {data?.id} ]
              </Typography>
              <div style={{display: "flex", flexDirection: "row"}}>
                <Typography variant="body2">
                  {data?.info || "아직 소개를 설정하지 않았어요!"}
                </Typography>
              </div>
            </CardContent>
          </>
        ) : (
          <div style={{height: 195}}>
            <h1>404: 없는 유저</h1>
          </div>
        )}

      </Card>
    </>
  );
}