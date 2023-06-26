import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Grid,
  Button,
} from '@mui/material';
import Footer from './Footer';
import Navbar from './Navbar';

function BlogList() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [favorite, setFavorite] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const addToFavorites = (post) => {
    const updatedFavorites = [...favorite];
    if (!updatedFavorites.some((item) => item.id === post.id)) {
      updatedFavorites.push(post);
      setFavorite(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setBlogPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Navbar />
      <div style={{ flexGrow: 1 }}>
        <h1 style={{ textAlign: 'center' }}>Blog Posts</h1>
        <Grid container spacing={2} justifyContent="center">
          {currentPosts.map((post) => (
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToFavorites(post)}
                >
                  Add to Favorites
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination
        style={{ alignSelf: 'center', marginTop: '20px' }}
        count={Math.ceil(blogPosts.length / postsPerPage)}
        page={currentPage}
        onChange={(event, page) => paginate(page)}
      />
      <Footer />
    </div>
  );
}

export default BlogList;
