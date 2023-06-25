import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import Footer from './Footer';
import Navbar from './Navbar';

function BlogPost() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState(null);
  const { id } = useParams();
const postId = id;
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  useEffect(() => {
    if (post) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users?id=${post.userId}`)
        .then((response) => {
          setAuthor(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching author:', error);
        });
    }
  }, [post]);

  if (!post || !author) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Navbar />
      <div style={{ flexGrow: 1 }}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image="https://firebasestorage.googleapis.com/v0/b/social-media-d16de.appspot.com/o/download.jpeg?alt=media&token=1b96ae4c-23d0-4fab-8984-ba859ed4b26f"

            alt="Blog Post"
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {author.name} - {author.email}
            </Typography>
            <Typography variant="body2" component="p">
              {post.body}
            </Typography>
          </CardContent>
        </Card>
        <h3>Comments</h3>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.name} secondary={comment.body} />
            </ListItem>
          ))}
        </List>
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;
