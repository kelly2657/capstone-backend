import React from 'react';
import '../main.css';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import EditNoteIcon from '@mui/icons-material/EditNote';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from 'react-router-dom';

const images = [
  {
    // url: '///.jpg',
    icon: <EditNoteIcon />,
    title: 'Note',
    page:'notes',
    width: '50%',
  },
  {
    icon: <QuestionAnswerIcon/>,
    title: 'Chat',
    page: 'join',
    width: '50%',
  },
  {
    icon: <CalendarMonthIcon/>,
    title: 'Calendar',
    page: 'cal',
    width: '50%',
  },
  {
    icon: <AccountCircleIcon/>,
    title: 'Profile',
    page: 'profile',
    width: '50%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 250,

  // 스마트폰 or 작은 화면 스타일정의
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));



// 글자 위치
const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

// 사진 위 어두운 처리
const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "#26619C",
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

// 글씨 아래 선
const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function Section() {
  const navigate = useNavigate()

  const handleButton1Click = (page) => {
    navigate('/' + page.toLowerCase());
  };

  return (
    <section>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => handleButton1Click(image.page)}
        >
          {/* <ImageSrc style={{ backgroundImage: `url(${image.url})` }} /> */}
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 5,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 10px)`,
                display: 'flex',
                flexDirection: 'column', // 텍스트를 세로로 나란히 표시
                alignItems: 'center', 
              }}
            >
              {image.icon}
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </section>
  );
}

