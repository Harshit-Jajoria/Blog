import React from 'react';
import { Typography, Link } from '@mui/material';

function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        backgroundColor: '#f5f5f5',
        padding: '16px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Blogging Website. All rights reserved.
        {' | '}
        <Link href="https://example.com" color="inherit">
          Terms of Service
        </Link>
        {' | '}
        <Link href="https://example.com" color="inherit">
          Privacy Policy
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
