import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Blogging Website
        </Typography>
        <Typography variant="body1" component={Link} to="/favorites" style={{ marginLeft: 'auto', textDecoration: 'none', color: 'white' }}>
          Favorites
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
