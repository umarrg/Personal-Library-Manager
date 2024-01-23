import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Container,
  Box,
  Typography,
} from "@mui/material";
import {
  API_BASE_URL,
  deleteBk,
  getAllBooks,
  updateBk,
} from "../services/bookService";
import { Book } from "../types/types";
import { mutate } from "swr";

const BookTable: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleEditClick = (book: Book) => {
    setEditBook(book);
    setOpenDialog(true);
  };

  const handleSaveChanges = () => {
    if (editBook) {
      updateBook(editBook);
      setOpenDialog(false);
      setEditBook(null);
    }
  };

  const updateBook = async (updatedBook: Book) => {
    try {
      const response = await updateBk(updatedBook.id, updatedBook);
      mutate(API_BASE_URL);
      console.log(response);

      const updatedBooks = books.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      );

      setBooks(updatedBooks);
      console.log("Updated books:", updatedBooks);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditBook(null);
  };

  const handleDeleteClick = (book: Book) => {
    setDeleteBook(book);
    setOpenDeleteDialog(true);
  };

  const HandleDeleteConfirmation = async () => {
    try {
      await deleteBk(deleteBook?.id);
      mutate(API_BASE_URL);
      const updatedBooks = books.filter((book) => book.id !== deleteBook?.id);
      setBooks(updatedBooks);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  return (
    <Container maxWidth="lg">
      <Box mt={6}>
        <TableContainer
          component={Paper}
          sx={{ borderLeft: "2px solid #BBDEFB" }}
        >
          {books.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Author</TableCell>
                  <TableCell align="center">Genre</TableCell>
                  <TableCell align="center">Published Year</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell align="center">{book.title}</TableCell>
                    <TableCell align="center">{book.author}</TableCell>
                    <TableCell align="center">{book.genre}</TableCell>
                    <TableCell align="center">
                      {new Date(book.publishedYear).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{book.description}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => handleEditClick(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleDeleteClick(book)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography p={2} align="center">
              No books available.
            </Typography>
          )}
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            Edit the details of the selected book.
          </DialogContentText>
          {editBook && (
            <form>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={editBook.title}
                    onChange={(e) =>
                      setEditBook({ ...editBook, title: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Author"
                    value={editBook.author}
                    onChange={(e) =>
                      setEditBook({ ...editBook, author: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Genre"
                    value={editBook.genre}
                    onChange={(e) =>
                      setEditBook({ ...editBook, genre: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Published Year"
                    type="date"
                    value={editBook.publishedYear}
                    onChange={(e) =>
                      setEditBook({
                        ...editBook,
                        publishedYear: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    value={editBook.description}
                    onChange={(e) =>
                      setEditBook({ ...editBook, description: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            Are you sure you want to delete this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={() => HandleDeleteConfirmation()} color="warning">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookTable;
