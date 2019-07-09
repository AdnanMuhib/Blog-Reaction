import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostList from "./components/posts/PostList";
import "./App.css";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          {/* <Route path="/Blog-Reaction" exact component={Home} /> */}
          {/* <Route path="/Blog-Reaction/home" component={Home} /> */}
          <Route path="/Blog-Reaction/posts" exact component={PostList} />
          {/* <Route path="/Blog-Reaction/post/:id" component={PostView} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
