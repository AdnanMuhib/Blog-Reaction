// react imports
import React from "react";
import PropTypes from "prop-types";

//  UI imports
import { Form, InputGroup } from "react-bootstrap";
import SearchRounded from "@material-ui/icons/SearchRounded";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  // when user types the search keyword
  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => this.props.handleSubmit(this.state.keyword)
    );
  };

  // when search button is clicked
  handleSubmit = event => {
    this.props.handleSubmit(this.state.keyword);
  };

  render() {
    return (
      <>
        <Form>
          <Form.Group>
            <InputGroup>
              <Form.Control
                id="keywordInput"
                type="text"
                placeholder="Search Post"
                value={this.state.keyword}
                onChange={this.handleChange("keyword")}
                autoComplete="off"
                aria-describedby="inputGroupPrepend"
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <SearchRounded />
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>
        </Form>
      </>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default SearchBar;
