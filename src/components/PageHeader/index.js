import React from 'react';

import { Link } from 'react-router-dom';

import './styles.css'

function PageHeader() {
  return (
    <header className="page-header">
      <div className="header-content">
        <Link to="/">Voltar</Link>
      </div>
    </header>
  );
};

export default PageHeader;