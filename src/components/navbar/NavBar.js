import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Home from "../../components/Home";
import PostList from "../posts/PostList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Home" />
          <Tab label="About" />
          <Tab label="Blog" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
              <Home />
              <Typography
                component="div"
                style={{ backgroundColor: "#cfe8fc", height: "50vh" }}
              />
            </Container>
          </React.Fragment>
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <h2>About This Blog</h2>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
              <Typography
                component="div"
                style={{ backgroundColor: "#cfe8fc", height: "50vh" }}
              />
            </Container>
          </React.Fragment>
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <PostList />
        </TabContainer>
      )}
    </div>
  );
}
