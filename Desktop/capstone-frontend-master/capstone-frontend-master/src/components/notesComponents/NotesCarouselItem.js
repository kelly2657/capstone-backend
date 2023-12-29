import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../../main.css';
import { Button,IconButton, Box, Tooltip } from '@mui/material';
import axios from 'axios';
import useUser from '../../hooks/useUser';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function NoteCarouselItem({note, title}) {
  const [isDeleted, setIsDeleted] = useState(false); 
  const user = useUser(); 
  const writer_id = user.uid;
  const [readNote, setReadNote] = useState({});
  const [newtitle, setNewtitle] = useState('');
  const [newbody, setNewBody] = useState('');
  const [showIcon, setShowIcon] = useState(false);
  const [isWriter, setIsWriter] = useState('');
  const {nid} = useParams();

  useEffect(() => {
    axios.get(`http://3.34.108.172/note/${note}`).then((res) => {
      setReadNote(res.data);
      setNewtitle(res.data.title);
      setNewBody(res.data.body); 
      setIsWriter(res.data.writer_id);
    });
  }, []);

  

  const handleMouseEnter = () => {
    setShowIcon(true);
  };

  const handleMouseLeave = () => {
    setShowIcon(false);
  };


  // 노트 삭제
  const deleteNote = () => {
    axios.delete(`http://3.34.108.172/note/delete/${note}`).then((res) => {
      setIsDeleted(true); 
    }).catch((error) => {
      console.error('노트 삭제 중 오류가 발생했습니다:', error);
    });
  };

  if (isDeleted) {
    window.location.href = '/notes'; 
    return null; 
  }


  return (
    <div className="groups-carousel-item">
      <Button className="groups-carousel-item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showIcon ? (
          <Box sx={{alignItems: 'center',m:1, display:'flex', color: 'white'}}>
          {(writer_id === isWriter) ? (
            <Tooltip title="노트를 수정합니다.">
              <IconButton href={`/note/${note}`} ><EditNoteIcon sx={{fontSize:'30px'}} /></IconButton>
            </Tooltip>
            ) : (
              <IconButton href={`/note/${note}`} ><VisibilityIcon sx={{fontSize:'30px'}} /></IconButton>
          )}

          {(writer_id === isWriter) && (<IconButton onClick={deleteNote}><DeleteIcon sx={{fontSize:'30px'}} /></IconButton>)}
          </Box>
        ) : (
          <h4>{title}</h4>
        )}
      </Button>
    </div>
  );
}
