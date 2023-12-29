import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from '../../pages/Note';
import { Link,useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import NotesCarouselItem from './NotesCarouselItem';

// 노트 리스트를 보여주는 함수
export default function NoteList() {
  const [notes, setNotes] = useState([]);

  const user = useUser();
  const { uid } = useParams(); 

  const writer_id = uid || user.uid; 

  useEffect(() => {
    axios.get('http://3.34.108.172/note').then((res) => setNotes(res.data));
  }, []);

  // 작성자에 맞게 필터링된 노트 
  const filteredNote = notes.filter((note) => note.writer_id == writer_id);
    


  return (
    <div>
      <div className="groups-carousel-profile">
        {filteredNote.map((element) => (
            <NotesCarouselItem key={element.id} note={element.id} title={element.title} />
        ))}
      </div>
     
    </div>
  );
}