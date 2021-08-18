// src/Title.js

import React from 'react';
import logo from '../../files/logo.png';
import './LogoHeader.scss';

function LogoHeader() {
  return (
    <div className="header">
      <img className="header--image" src={logo} alt="Logo"></img>
    </div>
  );
}

export default LogoHeader;
