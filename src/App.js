import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import PostsList from "./components/posts/ListView";
import PostView from "./components/posts/PostView";
import Home from "./components/Home";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        {/* <PostsList/> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={PostsList} />
          <Route path="/post/:id" exact component={PostView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
