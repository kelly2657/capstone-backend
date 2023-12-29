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
import useAuthActions from '../../hooks/useAuthAction';

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

export default function HeaderLogout() {
  const { logout } = useAuthActions();
  return (
    <div onClick={logout} style={{textAlign: 'center'}}>
      <Button 
        variant="contained" 
        size="large" 
        sx={{ height: '2.5rem'}}
        >
          <Logout/>
        로그아웃
      </Button>
    </div>
  );
}
