// React Imports
import React from "react";

// material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

// React Router Imports
import { Link } from "react-router-dom";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

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
          <Tab
            label={
              <Link to="/" style={{ color: "white" }}>
                Home
              </Link>
            }
          />
          <Tab
            label={
              <Link to="/posts" style={{ color: "white" }}>
                Blog
              </Link>
            }
          />
        </Tabs>
      </AppBar>
      {/* To Display something Fixed under Home tab */}
      {value === 0 && <TabContainer />}
      {/* To Display something Fixed under Blog tab */}
      {value === 1 && <TabContainer />}
    </div>
  );
}
