import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

// componente de encabezado para dar orden a todas las subpaginas.

const Header = () => {
  return (
    <div
      className="ui secondary pointing menu"
      style={{
        backgroundImage:
          'url(' +
          'https://images.unsplash.com/photo-1498330177096-689e3fb901ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80' +
          ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Link to="/" className="item" style={{ color: 'white' }}>
        <h3>Waves</h3>
      </Link>
      <div className="right menu"></div>
      <Link to="/" className="item" style={{ color: 'white' }}>
        <h4>Todos los canales</h4>
      </Link>
      <GoogleAuth />
    </div>
  );
};

export default Header;
