import * as React from 'react';
import '../../main.css';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import StudyTime from '../toolsComponents/StudyTime';
import Schedule from '../toolsComponents/schedulecomponents/Schedule';

export default function ProfileRight() {
  const [userStudyTime] = React.useState(120);
  function MoveToEdit(e) {
    window.location.href = './edit';
    return <button onClick={MoveToEdit}></button>;
  }

  return (
    <div style={{ width: '100%' }}>
      <Schedule></Schedule>

      {/* <StudyTime studyTime={userStudyTime}></StudyTime>
      <button onClick={MoveToEdit}>수정</button> */}
    </div>
  );
}
