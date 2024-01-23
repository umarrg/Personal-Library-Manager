import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import AddBook from "./pages/addBook";
import BookTable from "./pages/books";

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Box component="div" sx={{ flexGrow: 1 }}>
              <Link style={{ textDecoration: "none" }} to={"/"}>
                <Typography
                  color={"white"}
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  Personal Library Manager
                </Typography>
              </Link>
            </Box>
            <Button color="inherit" component={Link} to="/add">
              Add Book
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" Component={BookTable} />
          <Route path="/add" Component={AddBook} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
