import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export default function HeaderDrawerListItem({ text, variant = 'text', children, route }) {
  const COLOR = '#434C5E';
  return (

    <ListItem key={text} disablePadding component={Link} to={`/${route}`}>
      <ListItemButton
        sx={{
          height: 32,
          margin: [0, 0.5],
          background: variant === 'contained' ? COLOR : 'none',
          outline: variant === 'outlined' ? COLOR : 'none',
        }}>
        <ListItemIcon>{children || <InboxIcon />}</ListItemIcon>
        <ListItemText primary={text} sx={{ marginLeft: -1.5 }} />
      </ListItemButton>
    </ListItem>
    
  );
}
