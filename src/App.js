import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import PostList from "./components/posts/PostList";
import PostView from "./components/posts/PostView";
import PostForm from "./components/posts/PostForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={PostList} />
          <Route path="/posts" exact component={PostList} />
          <Route path="/posts/new" exact component={PostForm} />
          <Route path="/post/edit/:id" exact component={PostForm} />
          <Route path="/post/:id" exact component={PostView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
