import React, { useState } from 'react';

import Cal from '../components/toolsComponents/Cal';
export default function Tools() {
  const [userStudyTime] = useState(120);

  function MoveToEdit(e) {
    window.location.href = './edit';
    return <button onClick={MoveToEdit}></button>;
  }

  return (
    <div > 
      <p></p>

      {/* <Goal></Goal> */}
      <div className="myLists" >
        {/* <StudyGroup groups={userGroups} a href></StudyGroup> */}
        {/* <Todolist></Todolist> */}
        <Cal></Cal>
      </div>
      <p></p>
      {/* <Schedule></Schedule> */}
      {/* <StudyTime studyTime={userStudyTime}></StudyTime> */}
      {/* <button onClick={MoveToEdit}>수정</button> */}
    </div>
  );
}
