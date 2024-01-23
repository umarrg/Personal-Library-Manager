import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  Grid,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, addBook } from "../services/bookService";
import bookGenres from "../constants/bookGenres";

const AddBook = () => {
  const navigate = useNavigate();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: books,
    error,
    isValidating,
  } = useSWR(`${API_BASE_URL}/books`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 5000,
  });

  const formik = useFormik({
    initialValues: {
      id: Date.now(),
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      description: "",
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.title) {
        errors.title = "Title is required";
      }

      if (!values.author) {
        errors.author = "Author is required";
      }
      if (!values.genre) {
        errors.genre = "Genre is required";
      }
      if (!values.publishedYear) {
        errors.publishedYear = "Published Year is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const book = await addBook(values);
      console.log(book);
      mutate(API_BASE_URL);
      formik.resetForm();
      navigate("/");
    },
  });

  if (isValidating) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom></Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} mt={6}>
          <Grid item xs={12} sm={6}>
            <Typography align="left" mb={1}>
              Title*
            </Typography>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography align="left" mb={1}>
              Author*
            </Typography>
            <TextField
              fullWidth
              id="author"
              name="author"
              label="Author"
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography align="left" mb={1}>
              Genre*
            </Typography>
            <Select
              labelId="genre-label"
              id="genre"
              name="genre"
              fullWidth
              value={formik.values.genre}
              onChange={formik.handleChange}
              error={formik.touched.genre && Boolean(formik.errors.genre)}
            >
              {bookGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography align="left" mb={1}>
              Published Year*
            </Typography>
            <TextField
              fullWidth
              id="publishedYear"
              name="publishedYear"
              type="date"
              value={formik.values.publishedYear}
              onChange={formik.handleChange}
              error={
                formik.touched.publishedYear &&
                Boolean(formik.errors.publishedYear)
              }
              helperText={
                formik.touched.publishedYear && formik.errors.publishedYear
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" mb={1}>
              Description*
            </Typography>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              rows={4}
              multiline
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: 16 }}
        >
          Add Book
        </Button>
      </form>
    </Container>
  );
};

export default AddBook;
