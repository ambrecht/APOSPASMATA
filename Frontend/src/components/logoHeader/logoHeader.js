// src/Title.js

import React from 'react';
import logo from '../../files/logo.png';
import './logoHeader.scss';

function LogoHeader() {
  return (
    <div className="header">
      <img className="header--image" src={logo}></img>
    </div>
  );
}

export default LogoHeader;
