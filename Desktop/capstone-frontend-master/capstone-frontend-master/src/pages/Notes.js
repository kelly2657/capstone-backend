import React, { useEffect, useState } from 'react';
import '../main.css';
import NoteList from '../components/notesComponents/NoteList';
import axios from 'axios';
import useUser from '../hooks/useUser';

import AddIcon from '@mui/icons-material/Add';

import { Button } from '@mui/material';

export default function Notes() {
  // const last_updated = '2023-05-08 16:08:03';
  const user = useUser();
  const writer_id = user.uid;


  const openNewWindow = () => {
    // 새 창을 열기 위한 URL
    const newWindowURL = '/notecreate'; // 적절한 경로로 변경하세요

    // 새 창을 열기
    const newWindow = window.open(newWindowURL, 'Notecreate', 'width=1000,height=800');

    // 새 창이 차단되었을 경우를 처리
    if (!newWindow) {
      alert('팝업 차단이 활성화되어 새 창을 열 수 없습니다.');
    }    
  };

  
  return (
    <>
      <div style={{display:'flex'}}>
        <h1 style={{fontWeight:'bold', width:'50%'}}>노트 목록</h1>
      <div style={{textAlign:"end", width:'50%'}}>
        <Button style={{marginTop:'20px', fontSize:'20px', fontWeight:'600'}} onClick={openNewWindow}>
        <AddIcon/>
          CREATE
        </Button>
      </div>
      </div>
      <div className="note-wrapper">
        <NoteList />
      </div>
    </>
  );
}
