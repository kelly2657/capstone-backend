import * as React from 'react';
import { Button, Divider, Menu } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import HeaderToolsItem from './HeaderToolsItem';
import { Link } from 'react-router-dom';

import tools_calandar from '../../assets/images/tools_calandar.png';

export default function HeaderTools() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = (e) => {
    if (e.currentTarget.localName !== 'ul') {
      const menu = document.getElementById('simple-menu').children[2];
      const menuBoundary = {
        left: menu.offsetLeft,
        top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        right: menu.offsetLeft + menu.offsetHeight,
        bottom: menu.offsetTop + menu.offsetHeight,
      };
      if (
        e.clientX >= menuBoundary.left &&
        e.clientX <= menuBoundary.right &&
        e.clientY <= menuBoundary.bottom &&
        e.clientY >= menuBoundary.top
      ) {
        return;
      }
    }
    setOpen(false);
  };

  return (
    <div>
      <React.Fragment>
        <Button
          aria-owns={open ? 'simple-menu' : null}
          aria-haspopup="true"
          style={{ zIndex: 1301 }}
          onMouseOver={handleOpen}
          onMouseLeave={handleClose}>
          <ConstructionIcon />
        </Button>

        <Menu
          id="simple-menu"
          className="header-tools"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          PaperProps={{
            elevation: 0,
            onMouseLeave: handleClose,
            sx: {
              width: '30rem',
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              borderRadius: '0.5rem',
              padding: '0 !important',
            },
          }}>
          <HeaderToolsItem
            title="Calandar"
            text="#프로필 #일정 관리"
            children={<img src={tools_calandar} alt="tools_calandar"
            route="cal" />}
          />
          {/* <Divider className="margin-zero" />
          <HeaderToolsItem title="Calandar" children={<AutoStoriesOutlinedIcon />} /> */}
          <Divider className="margin-zero" />
          <HeaderToolsItem title="그룹" children={<WorkspacesIcon />} route="join"/>
          {/* <Divider className="margin-zero" />
          <HeaderToolsItem title="My H1" children={<CoPresentOutlinedIcon />} route="profile"/> */}
        </Menu>
      </React.Fragment>
    </div>
  );
}
