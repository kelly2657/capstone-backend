import * as React from 'react';
import HeaderSign from './HeaderSign';
import { Link } from 'react-router-dom';

import { Box, Button, Drawer, Divider, IconButton, List, Stack } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import HeaderDrawerListItem from './HeaderDrawerListItem';

export default function HeaderDrawer() {
  const [open, setOpen] = React.useState(false);
  const drawerOpen = () => {
    setOpen(true);
  };
  const drawerClose = () => {
    setOpen(false);
  };
  const list = (
    <Stack sx={{ height: '100vh', justifyContent: 'space-between' }}>
      <Stack>
        <HeaderSign username />
        <Divider />
        <Box
          sx={{ width: '15rem' }}
          role="presentation"
          onClick={drawerClose}
          onKeyDown={drawerClose}
          >
          <List sx={{ padding: '1rem' }}>
          <Link to="/notes" className="nav-link">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ width: '100%', margin: '0 0 0.5rem' }}>
              새 노트 만들기
            </Button>
            </Link>
            {/* <Divider /> */}
            <HeaderDrawerListItem text="홈" children={<HomeOutlinedIcon />} route=''/>
            <HeaderDrawerListItem text="노트" children={<AutoStoriesOutlinedIcon />} route='notes'/>
            <HeaderDrawerListItem text="그룹" children={<WorkspacesIcon />} route='join'/>
            <HeaderDrawerListItem text="My H1" children={<CoPresentOutlinedIcon />} route='profile'/>
          </List>
        </Box>
      </Stack>
      <Stack>
        {/* <p>ㅎㅇ</p> */}
      </Stack>
    </Stack>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={drawerOpen}>
          <IconButton aria-label="delete" onClick={drawerOpen} disabled color="primary">
            <TableRowsIcon />
          </IconButton>
        </Button>
        <Drawer open={open} onClose={drawerClose}>
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
