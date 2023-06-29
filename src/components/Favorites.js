import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, IconButton, List, ListItem, ListItemText, CardMedia, Grid, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Favorites() {
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavoritePosts(JSON.parse(storedFavorites));
    }
  }, []);
  

  const handleDelete = (postId) => {
    const updatedFavorites = favoritePosts.filter((post) => post.id !== postId);
    setFavoritePosts(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <Typography variant="h5" component="h2">
          Favorites
        </Typography>
        {favoritePosts.length > 0 ? (
          <List>
            <Grid container spacing={2} justifyContent="center">
            {favoritePosts.map((post) => (
              // <ListItem key={post.id}>
              //   <ListItemText primary={post.title} secondary={post.author} />
              //   <IconButton onClick={() => handleDelete(post.id)}>
              //     <Delete />
              //   </IconButton>
              // </ListItem>

              <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://firebasestorage.googleapis.com/v0/b/social-media-d16de.appspot.com/o/download.jpeg?alt=media&token=1b96ae4c-23d0-4fab-8984-ba859ed4b26f"
                  alt="Blog Post"
                />
                <CardContent>
                  <Link
                    to={`/post/${post.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItemText primary={post.title} secondary={post.body} />
                  </Link>
                </CardContent>
                <Button variant="contained" color="primary" onClick={() => handleDelete(post.id)}>
                    Remove from Favorites
                  </Button>
              </Card>
            </Grid>
            ))}
            </Grid>
          </List>
        ) : (
          <Typography variant="body2" component="p">
            No favorite posts yet.
          </Typography>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Favorites;
