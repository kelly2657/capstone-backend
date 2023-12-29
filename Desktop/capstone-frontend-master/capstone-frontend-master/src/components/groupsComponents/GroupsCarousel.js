import React from 'react';
import '../../main.css';
import GroupCarouselItem from './GroupsCarouselItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GroupsAdd from './GroupsAdd';


export default function GroupCarousel() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('http://3.34.108.172/group')
        .then((res) => {
          setGroups(res.data);
          console.log(res.data)
        })
        .catch((error) => {
            console.log(error);
        });
}, []);


  return (
    <>
      <div style={{display:'flex'}}>
      <h1 style={{width:'50%'}}>당신을 위한 스터디 그룹</h1>
      <GroupsAdd/>
      </div>
      <div className="groups-carousel-profile">
        {groups.map((group) => (
            <GroupCarouselItem key={group.id} group={group} />
        ))}
      </div>
    </>

  );
}
