/** @format */

import React from "react";
import { Grid, Box, Divider } from "@material-ui/core";
import "./comments.css";
import Pagination from "@material-ui/lab/Pagination";
import CreateComment from "./CreateComment.js";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import { getToken } from "./../../adalConfig";

const styles = (theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
});

const getCommentsAtPage = (
  indexOfFirstComment,
  indexOfLastComment,
  commentData
) => {
  return commentData.slice(indexOfFirstComment, indexOfLastComment);
};

class comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentData: [],
      commentsPerPage: 5,
      totalComments: 0,
      currentPage: 1,
      id: this.props.bookId,
      imageUrl: this.props.user.icon,
    };

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  async componentDidMount() {
    try {
      const promise = await axios.get(
        process.env.REACT_APP_API_URL + `/comments/book/${this.state.id}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      const { data: comments } = promise;
      this.setState({
        commentData: [...comments],
        totalComments: comments.length,
      });
    } catch (error) {
      console.log(error);
    }

    if (this.state.sortBy === undefined) {
      this.setState({
        sortBy: 'recent',
      });
    }
  }

  async handleCommentSubmit(text) {
      const addedComment = {};
      addedComment.text = text;
      addedComment.bookId = this.state.id;
      
      try {
        await axios.post(process.env.REACT_APP_API_URL + "/comments", addedComment, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        await this.componentDidMount();
        
      } catch (error) {
        console.log(error);
      }
    };
  
  async handleLike(id) {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/comments/like/" + id, {},
          { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      await this.componentDidMount();
    } catch (error) {
      console.log(error);
    }
  }

  async handleUnlike(id) {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + "/comments/unlike/" + id,
          { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      await this.componentDidMount();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      commentData,
      commentsPerPage,
      totalComments,
      imageUrl
    } = this.state;
    
    if (this.state.sortBy === 'recent') {
      commentData.sort((a, b) => (a.createdOn > b.createdOn) ? -1 : 1);
    } else {
      commentData.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
    }
    
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
    const indexOfLastComment = this.state.currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const sortBy = (sort) => this.setState({ sortBy: sort });

    return (
      <React.Fragment>
        <div className="page">
          <div className="comment-top">
            <span className="total-comments">
              Comments &middot; {totalComments}{" "}
            </span>
            {this.state.sortBy === 'recent' ?
                (<Box component="span" m={1}>
                  <button className="sort-by" onClick={() => sortBy('rating')}>
                    Sort by: <span className="bold"> Recent &#9662; </span>
                  </button>
                </Box>)
                : 
                (<Box component="span" m={1}>
                  <button className="sort-by" onClick={() => sortBy('recent')}>
                    Sort by: <span className="bold"> Rating &#9662; </span>
                  </button>
                </Box>)
            }
          </div>
          {getCommentsAtPage(
            indexOfFirstComment,
            indexOfLastComment,
            commentData
          ).map((item) => (
            <div key={commentData.indexOf(item)}>
              <Grid container spacing={0}>
                <Grid item>
                  <img src={item.image} alt="Avatar" className="avatar" />
                </Grid>
                <Grid item xs={11}>
                  <div className="name">{item.author}</div>
                  <div className="date">{item.createdOn}</div>

                  <div className="commentText">{item.text}</div>
                  <div className="likes">
                    {item.rating} likes &middot;{" "}
                    {item.isLiked ? (
                        <button
                            className="like"
                            onClick={() => this.handleUnlike(item.id)}
                        >
                          Unlike
                        </button>
                    ) : (
                        <button
                            className="like"
                            onClick={() => this.handleLike(item.id)}
                        >
                          Like
                        </button>
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>
          ))}
          <Divider id={"book-details-divider"} />
          <div className="tot-coms-pagination">
            <span>{totalComments} comments </span>
            <Pagination
              className="pageNumbers"
              count={Math.ceil(totalComments / commentsPerPage)}
              size="small"
              variant="outlined"
              shape="rounded"
              onChange={(event, page) => paginate(page)}
            />
          </div>
        </div>
        <div className="padding-top">
          <Grid container spacing={0}>
            <Grid item xs>
              <img src={imageUrl} alt="Avatar" className="avatar" />
            </Grid>
            <Grid item xs={11}>
              <CreateComment onSubmit={this.handleCommentSubmit}/>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(comments);
