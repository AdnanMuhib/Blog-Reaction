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
          <Route path="/Blog-Reaction" exact component={PostList} />
          <Route path="/Blog-Reaction/posts" exact component={PostList} />
          <Route path="/Blog-Reaction/posts/new" exact component={PostForm} />
          <Route
            path="/Blog-Reaction/post/edit/:id"
            exact
            component={PostForm}
          />
          <Route path="/Blog-Reaction/post/:id" exact component={PostView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
