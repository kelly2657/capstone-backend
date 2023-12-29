import * as React from 'react';
import { Link } from 'react-router-dom';
import '../../main.css';
import logo from '../../assets/images/logo.png';

import HeaderSearch from './HeaderSearch';

export default function HeaderNoLogin() {
  return (
    <header>
      <div className="header-in">
        <div className="header-left">
          {/* <HeaderDrawer /> */}
          <Link to="/" className="header-button home">
            <img src={logo} alt="logo"/>
          </Link>
          <HeaderSearch/>
        </div>

      </div>
    </header>
  );
}
