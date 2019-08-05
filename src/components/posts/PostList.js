// React Imports
import React from "react";
//  Material UI imports
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
// Bootstrap imports
import { Table, Container } from "react-bootstrap";
// React Router Imports
import { Link } from "react-router-dom";
// Paginator Imports
import Pagination from "material-ui-flat-pagination";
// Custom Imports
import PostListHeader from "./PostListHeader";
import SortPosts from "../sort";
import API from "../../services/blogAPI";
import { initilizeLikesStorage } from "../../utils";

import axios from "axios";
// import SortPosts from "../sort";

// PostsList React Component
class PostList extends React.Component {
  state = {
    posts: [],
    loading: true,
    error: false,
    errorMSG: "",
    offset: 0,
    totalPosts: 0,
    paginationMode: 1,
    sortOrder: "asc"
  };

  // handle search submit
  handleSearchSubmit = keyword => {
    this.setState({
      paginationMode: 0
    });
    if (keyword === "") {
      this.getTotalPostsCount();
      this.getPosts(1);
      this.setState({
        paginationMode: 1
      });
    } else {
      API.searchPosts(keyword)
        .then(response => {
          this.setState({
            posts: response.data,
            totalPosts: response.data.length
          });
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            // API request cancelled
          } else {
            this.setState({
              error: true,
              errorMSG: error.message
            });
          }
        });
    }
  };

  // handle pagination
  handlePaginationClick = (offset, total) => {
    this.setState({ offset });
    this.getPosts(total);
  };
  getSortedPosts = (key, order) => {
    API.sortPosts(key, order)
      .then(response => {
        this.setState({
          loading: false,
          posts: response.data,
          totalPosts: response.data.length
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true,
          errorMSG: error.message
        });
      });
  };
  // handle Sorting
  handleSortingClick = (key, order) => {
    this.setState(
      {
        loading: true,
        paginationMode: 0,
        sortOrder: order
      },
      () => this.getSortedPosts(key, this.state.sortOrder)
    );
  };

  getTotalPostsCount = () => {
    let totalPostsCount = 0;
    API.getPosts()
      .then(response => {
        totalPostsCount = response.data.length;
        this.setState({
          totalPosts: totalPostsCount
        });
      })
      .catch(errors => {
        this.setState({
          error: true,
          errorMSG: errors
        });
      });
  };

  getPosts = total => {
    if (this.state.posts.length === 0) {
      this.setState({
        loading: true
      });
    }
    try {
      API.getPaginatedPosts(total)
        .then(response => {
          this.setState({
            loading: false,
            posts: response.data
          });
        })
        .finally(() => {
          initilizeLikesStorage(this.state.posts);
        });
    } catch (errors) {
      this.setState({
        loading: false,
        errorMSG: errors.message,
        error: true
      });
    }
  };

  componentDidMount() {
    this.getTotalPostsCount();
    this.getPosts(1);
  }

  deletePost = id => {
    API.deletePost(id)
      .then(response => {})
      .catch(errors => {
        this.setState({
          error: true,
          errorMSG: errors
        });
      })
      .finally(() => {
        this.getPosts(1);
      });
  };

  render() {
    const DATE_OPTIONS = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    let data = "";
    if (this.state.loading === true) {
      data = (
        <div className="Center">
          <CircularProgress />
        </div>
      );
    } else if (this.state.error === true) {
      data = (
        <div className="Center">
          Something Went Wrong
          <p className="Red">{this.state.errorMSG}</p>
        </div>
      );
    } else {
      data = (
        <div>
          <PostListHeader handleSubmit={this.handleSearchSubmit} />
          <Container fluid id="modified-container">
            <Table responsive striped hover size="sm">
              {/* Table Header is part of SortPosts Component */}
              <SortPosts
                handleSort={this.handleSortingClick}
                order={this.state.sortOrder}
              />
              <tbody>
                {this.state.posts.map(post => (
                  <tr key={post.id}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td>
                      <Link to={`/post/${post.id}`} className="PostTitle">
                        {post.title}
                      </Link>
                      <br />
                      &nbsp;<Link to={`/post/edit/${post.id}`}>Edit</Link>
                      &nbsp;&nbsp;
                      <Link to="#" onClick={() => this.deletePost(post.id)}>
                        Delete
                      </Link>
                    </td>
                    <td>{post.tags}</td>
                    <td>
                      {new Date(post.createdAt).toLocaleDateString(
                        "en-GB",
                        DATE_OPTIONS
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <Grid container>
            <Grid item xs={4} />
            <Grid item xs={4}>
              {this.state.paginationMode === 1 && (
                <Pagination
                  limit={5}
                  offset={this.state.offset}
                  total={this.state.totalPosts}
                  onClick={(e, offset, total) =>
                    this.handlePaginationClick(offset, total)
                  }
                  className="Center"
                  size="large"
                  nextPageLabel={<span className="XLargeFont">></span>}
                  previousPageLabel={<span className="XLargeFont"> {"<"}</span>}
                />
              )}
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </div>
      );
    }

    return data;
  }
}

export default PostList;
