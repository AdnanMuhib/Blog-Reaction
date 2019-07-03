import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PostList from "./components/posts/PostList";
import PostView from "./components/posts/PostView";
import "./App.css";
import PostData from "../src/data/posts.json";
function App() {
  localStorage.setItem("posts", JSON.stringify(PostData))
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Blog-Reaction" exact component={Home} />
          <Route path="/Blog-Reaction/home" component={Home} />
          <Route path="/Blog-Reaction/posts" exact component={PostList} />
          <Route path="/Blog-Reaction/post/:id" component={PostView} />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <h1>
        <Link to={"/Blog-Reaction/posts"}>{"BLOG"}</Link>
      </h1>
    </div>
  );
}

export default App;
