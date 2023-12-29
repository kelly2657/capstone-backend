import React, { useEffect, useState } from 'react';
import '../main.css';
// import NoteBody from '../components/notesComponents/NoteBody';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios';
import WhsiwygTitle from '../components/notesComponents/WhsiwygTitle';
import WhsiwygBody from '../components/notesComponents/WhsiwygBody';
import WhsiwygMenu from '../components/notesComponents/WhsiwygMenu';

import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import useUser from '../hooks/useUser';


export default function Note() {
  const [readNote, setReadNote] = useState({});
  const {nid} = useParams();
  const [isDeleted, setIsDeleted] = useState(false); 
  const [newtitle, setNewtitle] = useState('');
  const [newbody, setNewBody] = useState('');
  const [isEdited, setIsEdited] = useState(false); 
  const [isWriter, setIsWriter] = useState('');
  const user = useUser();
  const writer_id = user.uid;
  
  useEffect(() => {
    axios.get(`http://3.34.108.172/note/${nid}`).then((res) => 
    {setReadNote(res.data);
      setNewtitle(res.data.title);
      setNewBody(res.data.body); 
      setIsWriter(res.data.writer_id);
    });
  }, []);


  const deleteNote = () => {
    if (writer_id === isWriter) {
      console.log({writer_id})
      console.log({isWriter})
      axios.delete(`http://3.34.108.172/note/delete/${nid}`).then((res) => {
        setIsDeleted(true); 
      }).catch((error) => {
        console.error('노트 삭제 중 오류가 발생했습니다:', error);
      });
    } else {
      console.log("작성자가 아닙니다. 노트를 삭제할 수 없습니다.");
    }
  };

  if (isDeleted) {
    window.location.href = '/notes'; 
    return null; 
  }

    const editNote = () => {

      const updateData = {
        title : newtitle,
        body: newbody,
        dir: '/home/update/',
        last_updated_date: new Date().toISOString()
      };
    
      if (writer_id === isWriter) {
        axios.put(`http://3.34.108.172/note/edit/${nid}`, updateData)
          .then((res) => {
            console.log('노트가 성공적으로 업데이트되었습니다:', res.data);
            setIsEdited(true);
          })
          .catch((error) => {
            console.error('노트 업데이트 중 오류가 발생했습니다:', error);
          });
      } else {
        console.log('작성자가 아닙니다. 노트를 수정할수 없습니다');
      }
    };

    if (isEdited) {
      window.location.href = '/notes'; 
      return null; 
    }

  return (
    <>
      <div style={{textAlign:"end"}}>
          {(writer_id === isWriter) && (
            <>
            <Button startIcon={<DriveFileRenameOutlineIcon/>} onClick={editNote}>
              EDIT
            </Button>
            <Button startIcon={<DeleteSweepIcon/>} onClick={deleteNote}>
              DELETE
            </Button>
            </>
          )}
      </div>
      <div className="whsiwyg-wrapper">
       <WhsiwygTitle value={newtitle} onChange={setNewtitle} />
        {/* <WhsiwygBody value={newbody} onChange={setNewBody} /> */}
        <WhsiwygBody value={newbody} onChange={setNewBody} />

        <WhsiwygMenu last_updated={readNote.last_updated_date} />

      </div>
    </>
  );
}
