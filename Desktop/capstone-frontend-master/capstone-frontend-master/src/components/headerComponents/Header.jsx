import * as React from 'react';
import { Link } from 'react-router-dom';
import '../../main.css';
import logo from '../../assets/images/logo.png';
import { Button, ButtonGroup } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import HeaderLogout from './HeaderLogout';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  return (
    <header>
      <div className="header-in">
        <div className="header-left">
          <Link to="/" className="header-button home">
            <img src={logo} alt="logo"/>
          </Link>

          <ButtonGroup variant="text" >
            <Link to="/notes" className="nav-link">
              <Button variant="text" startIcon={<DescriptionIcon />}>
                Notes
              </Button>
            </Link>

            <Link to="/group" className="nav-link">
              <Button variant="text" startIcon={<WorkspacesIcon />}>
                Groups
              </Button>
            </Link>
            
            <Link to="/scheduler" className="nav-link">
              <Button variant="text" startIcon={<CalendarMonthIcon />}>
                Calendar
              </Button>
            </Link>
            <HeaderSearch/>
          </ButtonGroup>
        </div>
        <div className="header-right">
          <HeaderLogout />
        </div>
      </div>
    </header>
  );
}
