import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";

function PublishedPostsTable() {
  const [publishedPosts, setPublishedPosts] = useState([]);

  useEffect(() => {
    fetchPublishedPosts();
  }, []);

  const fetchPublishedPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/published-posts"
      ); // Replace with your API endpoint
      setPublishedPosts(response.data);
    } catch (error) {
      console.error("Error fetching published posts:", error);
    }
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="contained">view Running Processes</Button>
        <Button variant="contained">view Published Posts</Button>
        <Button variant="contained">contained</Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="published posts table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishedPosts.map((post: any) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.publishedDate}</TableCell>
                <TableCell>{/* Add actions/buttons here */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PublishedPostsTable;
