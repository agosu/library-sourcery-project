/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "./WishListItem.css";
import axios from "axios";
import menuItems from "../MenuList/utils/menuItems";
import { getToken } from "./../../adalConfig";

const LikeButtonLiked = withStyles({
  root: {
    background: "#4568FB",
    width: "52px",
    height: "24px",
    padding: 0,
    minWidth: 0,
    color: "#fff",
    "&:hover": {
      background: "#1e4afa",
    },
  },
})(Button);

const LikeButton = withStyles({
  root: {
    background: "#f2f2f2",
    width: "52px",
    height: "24px",
    padding: 0,
    minWidth: 0,
    color: "#050237",
    fontWeight: 600,
  },
})(Button);

export default class WishListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.b,
    };
  }

  async handleLike(id, onUpdate) {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/wishlist/like/" + id, {},
          { headers: { Authorization: `Bearer ${getToken()}` } }
          );
      const { data: newBook } = await axios.get(
        process.env.REACT_APP_API_URL + "/wishlist/" + id,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      onUpdate();
      this.setState({
        book: newBook[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handleUnlike(id, onUpdate) {
    try {
      await axios.delete(
        process.env.REACT_APP_API_URL + "/wishlist/unlike/" + id,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      const { data: newBook } = await axios.get(
        process.env.REACT_APP_API_URL + "/wishlist/" + id,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      onUpdate();
      this.setState({
        book: newBook[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {book, onUpdate} = this.props;
    
    return (
      <React.Fragment>
        <div className="book">
          <img
            className="book-img"
            src={this.state.book.imageUrl}
            alt={"book cover"}
          />
          <div className="book-title_author">
            <div className="book-title">{this.state.book.title}</div>
            <div className="book-author">{this.state.book.author}</div>
          </div>
          <div id={"like-button-block"}>
            {this.state.book.isLiked ? (
              <LikeButtonLiked
                startIcon={<ThumbUpAltIcon style={{ color: "#fff" }} />}
                variant={"contained"}
                disableElevation
                onClick={() => {
                  this.handleUnlike(this.state.book.id, onUpdate);
                }}
              >
                {this.state.book.rating}
              </LikeButtonLiked>
            ) : (
              <LikeButton
                startIcon={<ThumbUpAltIcon style={{ color: "#050237" }} />}
                variant={"contained"}
                disableElevation
                onClick={() => {
                  this.handleLike(this.state.book.id, onUpdate);
                }}
              >
                {this.state.book.rating}
              </LikeButton>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

WishListItem.propTypes = {
  b: PropTypes.object.isRequired,
};
