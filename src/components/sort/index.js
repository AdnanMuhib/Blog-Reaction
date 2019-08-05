// react imports
import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";

// Bootstrap imports

// custom imports
import { POST_FIELDS } from "../../constants/postFields";

class SortPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.order
    };
  }

  handleClick = newKey => {
    if (this.state.order === "asc") {
      this.props.handleSort(newKey, "desc");
    } else {
      this.props.handleSort(newKey, "asc");
    }
  };

  render() {
    let orderIcon = <ArrowDownward className="SortArrow" />;

    if (this.state.order === "asc") {
      orderIcon = <ArrowUpward className="SortArrow" />;
    }

    return (
      <>
        <thead className="thead-dark">
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th
              className="Link"
              onClick={() => this.handleClick(POST_FIELDS.TITLE)}
            >
              Title {orderIcon}
            </th>
            <th
              className="Link"
              onClick={() => this.handleClick(POST_FIELDS.TAGS)}
            >
              Tags {orderIcon}
            </th>
            <th
              className="Link"
              onClick={() => this.handleClick(POST_FIELDS.CREATED_AT)}
            >
              Date {orderIcon}
            </th>
          </tr>
        </thead>
        {/* <Grid container>
          <Grid item md={3}>
            <Button
              variant="outlined"
              onClick={() => this.handleClick(POST_FIELDS.TITLE)}
            >
              Post Title
              {orderIcon}
            </Button>
          </Grid>
          <Grid item md={3}>
            <Button
              variant="outlined"
              onClick={() => this.handleClick(POST_FIELDS.CREATED_AT)}
            >
              Posted at
              {orderIcon}
            </Button>
          </Grid>
          <Grid item md={6} />
        </Grid> */}
      </>
    );
  }
}

SortPosts.propTypes = {
  handleSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired
};

export default SortPosts;
