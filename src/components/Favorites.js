import React from 'react';
import { Typography, Card, CardContent, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Navbar from './Navbar';
import Footer from './Footer';

function Favorites() {
  const favoritePosts = [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
    <div>
      <Typography variant="h5" component="h2">
        Favorites
      </Typography>
      {favoritePosts.length > 0 ? (
        <List>
          {favoritePosts.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={post.title} secondary={post.author} />
              <IconButton>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" component="p">
          No favorite posts yet.
        </Typography>
      )}
    </div>
    <Footer/>
    </div>

  );
}

export default Favorites;
