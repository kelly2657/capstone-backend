import * as React from 'react';

const saveNote = ({ text, writer_id }) => {
  console.log(text);
  axios.post(`http://3.34.108.172/note/new?writer_id=${writer_id}`)
  return axios.put(`http://3.34.108.172/note/create/new`);
};

export default function NoteNav() {
  return <button onClick={(data) => saveNote(data)}>Save</button>;
}
