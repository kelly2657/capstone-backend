import React, { useState } from 'react';
import '../main.css';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import WhsiwygTitle from '../components/notesComponents/WhsiwygTitle';
import WhsiwygBody from '../components/notesComponents/WhsiwygBody';
import WhsiwygMenu from '../components/notesComponents/WhsiwygMenu';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useUser from '../hooks/useUser'
import { Button } from '@mui/material';

export default function Notecreate() {
  // const last_updated = '2023-05-08 16:08:03';
  const user = useUser();
  const writer_id = user.uid;

  const [isSaved, setIsSaved] = useState(false);

  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState(''); 

  

  const createNote = () => {
    const noteData = {
      title: title,
      body: body,
      dir: '/home/',
      tags: []
    };

    axios.post(`http://3.34.108.172/note/new?writer_id=${writer_id}`, noteData)
      .then((res) => {
        setIsSaved(true); 
        window.opener.location.reload(); 
      })
      .catch((error) => {
        console.error('노트 생성 중 오류가 발생했습니다:', error);
      });
  };


  

  if (isSaved) {
    window.location.href = '/notes'; 
    window.close(); 
  }

    
  return (
    <>
      <div style={{textAlign:"end"}}>
          
          <Button  startIcon={<BookmarkAddedIcon/>} onClick={createNote}>
            SAVE
          </Button>
      </div>
        <div className="whsiwyg-wrapper">
          <WhsiwygTitle onChange={setTitle}/>
          <WhsiwygBody onChange={setBody} />
          <WhsiwygMenu last_updated={isSaved.last_updated_date} />
        </div>
    </>
  );
}
