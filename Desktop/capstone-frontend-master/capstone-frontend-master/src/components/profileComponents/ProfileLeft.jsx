import * as React from 'react';


import '../../main.css';
import { Card, CardContent, CardMedia, Typography, TextField, Button, Modal, Box} from '@mui/material';
import GroupCarouselItem from '../groupsComponents/GroupsCarouselItem';
import axios from 'axios';
import useUser from '../../hooks/useUser';
import GroupsAdd from '../groupsComponents/GroupsAdd';
import Tools from '../../pages/Tools';

export default function ProfileLeft() {

  
  const user = useUser();
  const [data, setData] = React.useState();
  const [part, setPart] = React.useState();

  const [name, setName] = React.useState();
  const [info, setInfo] = React.useState();
  
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onInfoHandler = (event) => {
    setInfo(event.currentTarget.value);
  }

  const onNameSubmitHandler = (event) => {
    event.preventDefault();
    editData("name", name);
  }

  const onInfoSubmitHandler = (event) => {
    event.preventDefault();
    editData("info", info);
  }
  
  const [isToggle, setToggle] = React.useState({
    name: false,
    nameInput: false,
    info: false,
    infoInput: false,
  });

  const getData = async () => {
    try {
      const uid = user.uid;
      const res = await axios.get(`http://3.34.108.172/user/${uid}`)
      setData(res.data)
      const res_participation = await axios.get(`http://3.34.108.172/user/participation/${uid}`)
      setPart(res_participation.data)
    } catch (err) {
      console.error(err)
    }
  }

  const editData = async (key, value) => {
    try {
      const uid = user.uid;
      const form = {
        [key]: value
      };
      console.log('form:', form)
      console.log(uid)
      const res = await axios.put(
        `http://3.34.108.172/user/edit/${uid}`,
        JSON.stringify(form),
        {headers: {"Content-Type": 'application/json'}}
      );
      window.location.reload();
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
    <div style={{display:'flex'}}>
    <Card sx={{ width: "30%", height:"30rem",maxHeight: "80%", marginRight: '16px' }}>
      <CardMedia
        sx={{height:300, width:"97%", margin:"5px"}}
        image={data?.photo_url}
        title="green iguana"
      />
      <CardContent sx={{ width: "100%" }} >
      <Typography variant="body2" style={{textAlign:'end'}}>
          [ UID: {data?.id} ]
        </Typography>
        <div
          style={{
            display: "flex", flexDirection: "row"
          }}
          onMouseOver={() => setToggle({...isToggle, name: true})}
          onMouseOut={() => setToggle({...isToggle, name: false})}
        >

          <div style={{display: (isToggle.nameInput ? "none" : "block")}}>
            <Typography gutterBottom variant="h3" component="div" style={{fontWeight:"bold",marginBottom:'30px'}}>
              {data?.name}
            </Typography>
          </div>
          <div style={{display: (isToggle.nameInput ? "block" : "none")}}>
            <form onSubmit={onNameSubmitHandler}>
              <TextField
                id='name'
                // required
                label="이름"
                placeholder={data?.name}
                defaultValue={name}
                type='search'
                onChange={onNameHandler}
                variant="standard"
              />
              <Button type='submit' style={{marginTop:'10px'}} >
                확인
              </Button>
            </form>
          </div>
          <div style={{display: (isToggle.name ? "block" : "none"), cursor: "pointer"}} onClick={() => setToggle({...isToggle, nameInput: !isToggle.nameInput})}>
            <Typography variant="body2" color="text.secondary" style={{display: (isToggle.nameInput ? "none" : "block")}}>
              편집
            </Typography>
          </div>

        </div>


        
        <div
          style={{
            display: "flex", flexDirection: "row"
          }}
          onMouseOver={() => setToggle({...isToggle, info: true})}
          onMouseOut={() => setToggle({...isToggle, info: false})}
        >

          <div style={{display: (isToggle.infoInput ? "none" : "block")}}>
            <Typography variant="body2" style={{fontWeight:"550"}}>
              {data?.info || "아직 소개를 설정하지 않았어요!"}
            </Typography>
          </div>
          <div style={{display: (isToggle.infoInput ? "block" : "none")}}>
            <form onSubmit={onInfoSubmitHandler}>
              <TextField
                id='info'
                // required
                label="소개"
                placeholder={data?.info}
                defaultValue={info}
                type='search'
                onChange={onInfoHandler}
                variant="standard"
              />
              <Button type='submit' style={{marginTop:'10px'}} >
                확인
              </Button>
              
            </form>
          </div>
          <div style={{display: (isToggle.info ? "block" : "none"), cursor: "pointer"}} onClick={() => setToggle({...isToggle, infoInput: !isToggle.infoInput})}>
            <Typography variant="body2" color="text.secondary" style={{display: (isToggle.infoInput ? "none" : "block")}}>
              편집
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
    <Tools/>
    </div>
    <p></p>
    <Card sx={{height:'13rem'}}>
      <div style={{display:'flex'}}>
      <h3 style={{marginLeft: 8, width:'50%'}}>{data?.name}의 스터디그룹</h3>
      <GroupsAdd/>
      </div>
      <div className="groups-carousel">
        {part?.map((group) => (
            <GroupCarouselItem key={group.id} group={group} />
        ))}
      </div>
    </Card>
    </div>
  );
}

