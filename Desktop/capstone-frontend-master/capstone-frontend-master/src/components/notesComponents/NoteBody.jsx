import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

// 노트 아이디에 맞는 내용
export default function NoteBody ({id, title, body})  {
  return (
    <Card sx={{ width: "100%", maxHeight: "100%", marginRight: '16px' , display:'flex'}}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
     
      </CardContent>
    </Card>
  );
}
