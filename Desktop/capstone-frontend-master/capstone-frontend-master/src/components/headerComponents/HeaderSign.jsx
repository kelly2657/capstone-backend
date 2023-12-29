import * as React from 'react';
import '../../main.css';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import SocialButton from '../signComponents/SocialButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1
};

export default function HeaderSign({ username = false }) {
  const [isSigned, setSigned] = React.useState(false); // 유저 상태는 Redux / Context로 업데이트
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const isAnchorEl = Boolean(anchorEl);
  const menuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {isSigned ? (
        <Stack className="header-drawer-profile" direction="row">
          <Tooltip title="내 계정">
            <IconButton
              onClick={menuOpen}
              size="small"
              sx={{ width: '100%', justifyContent: 'start', borderRadius: 0 }}
              aria-controls={isAnchorEl ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isAnchorEl ? 'true' : undefined}>
              <Avatar className="header-drawer-profile-avatar" />
              {username && (
                <Typography className="header-drawer-profile-username">Username</Typography>
              )}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={isAnchorEl}
            onClose={menuClose}
            onClick={menuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                width: 192,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 20,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
            <MenuItem onClick={menuClose}>
              <Link to="/tools" className="profile-menu-link">
                <Avatar />
                마이페이지
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={menuClose}>
              <Link to="/my" className="profile-menu-link">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                설정
              </Link>
            </MenuItem>
            <MenuItem onClick={menuClose}>
              <Link to="/my" className="profile-menu-link">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                로그아웃
              </Link>
            </MenuItem>
          </Menu>{' '}
        </Stack>
      ) : (
        <div style={{textAlign: 'center'}}>
          <Button variant="contained" size="large" sx={{ height: '2.5rem'}} onClick={modalOpen}>
            카카오로 로그인
          </Button>
          <Modal
            open={open}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                카카오로로 로그인
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
              {/* <SocialButton social="google" /> */}
              <SocialButton social="kakao" />
              {/* <SocialButton social="naver" /> */}
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
