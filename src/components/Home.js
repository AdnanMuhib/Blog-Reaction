import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function Home() {
    const classes = useStyles();
  return (
    <div className="Center">
      <h2>Welcome to First Blog in React Js</h2>
      
      <Link to={"/posts"}><Button variant="contained" color="secondary" className={classes.button}>
            See Latest Posts
        </Button></Link> 
    </div>
  );
}
export default Home;
