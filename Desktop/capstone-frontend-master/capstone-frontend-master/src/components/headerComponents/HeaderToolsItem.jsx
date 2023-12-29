import * as React from 'react';
import { MenuItem, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HeaderToolsItem({ title, text, children, route }) {
  const COLOR = '#434C5E';
  return (
    <MenuItem className="header-tools-item" key={text} disablePadding component={Link} to={`/${route}`}>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <div className="left">{children}</div>
        <Stack className="right">
          <Typography className="title"> {title}</Typography>
          <Typography className="text"> {text}</Typography>
        </Stack>
      </Stack>
    </MenuItem>
  );
}
