/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowBooksLists from "../../components/DashboardComponents/ShowBookLists.jsx";
import ShowCurrentlyReading from "../../components/DashboardComponents/ShowCurrentlyReading";
import "./Dashboard.css";
import { getToken } from "./../../adalConfig";

export default function Dashboard({ books, user }) {
  const [readingBooks, setReadingBooks] = useState([]);
  useEffect(() => {
    fetchDashboard();
  }, [user]);
  async function fetchDashboard() {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/dashboard/${user.id}/reading`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setReadingBooks([...data]);
    } catch (error) {
      console.log(error);
    }
  }
  function checkState(user) {
    return user.id === undefined ? (
      <div />
    ) : (
      <React.Fragment>
        <div id="dashboard-wrap">
          <div>
            <ShowBooksLists books={books} user={user} />
          </div>
          <div>
            <ShowCurrentlyReading readingBooks={readingBooks} />
          </div>
        </div>
      </React.Fragment>
    );
  }
  return checkState(user);
}
