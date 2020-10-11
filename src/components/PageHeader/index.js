import React from 'react';
import { Link } from 'react-router-dom';

import { HiHome, HiOutlinePencil } from 'react-icons/hi';

import './styles.css'

function PageHeader() {
  return (
    <header className="page-header">
      <div className="header-content">
        <Link to="/" className="home">
          <HiHome size="22px" />
          <p>Home</p>
        </Link>
        <Link to="/announce" className="announce">
          <HiOutlinePencil size="22px" />
          <p>Anuncie aqui!</p>
        </Link>
      </div>
    </header>
  );
};

export default PageHeader;