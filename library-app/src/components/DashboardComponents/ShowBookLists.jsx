/** @format */

import React, { useState, useEffect } from "react";
import "../../containers/Dashboard/Dashboard.css";
import SeeAllButton from "./SeeAllButton";
import DashboardBooksList from "./DashboardBooksList";
import { Box } from "@material-ui/core";
import axios from "axios";
import { getToken } from "./../../adalConfig";

export default function ShowBookLists({ books, user }) {
  const [enjoyBooks, setEnjoyBooks] = useState(books);
  const [newBooks, setNewBooks] = useState([]);

  async function fetchEnjoyBooks() {
    try {
      const { data: enjoyBooks } = await axios.get(
        process.env.REACT_APP_API_URL + `/dashboard/${user.id}/enjoy`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setEnjoyBooks(enjoyBooks);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchNewBooks() {
    try {
      const { data: newBooks } = await axios.get(
        process.env.REACT_APP_API_URL + "/dashboard/new",
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setNewBooks(newBooks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEnjoyBooks();
    fetchNewBooks();
  }, [user]);

  return (
    <React.Fragment>
      <Box>
        <div id="dashboard-title">
          New Books
          <SeeAllButton />
        </div>
        <div id="dashboard-books-list">
          <DashboardBooksList books={newBooks} showNumber={4} />
        </div>
        <div id="dashboard-title">
          You might enjoy
          <SeeAllButton />
        </div>
        <div id="dashboard-books-list">
          <DashboardBooksList books={enjoyBooks} showNumber={8} />
        </div>
      </Box>
    </React.Fragment>
  );
}
