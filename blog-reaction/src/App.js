import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import PostList from './posts/PostList'
import PostView from './posts/PostView'
import './App.css';

function App() {
  return (
    <Router>
      
    <div className="App">
      {/* <PostList /> */}
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/post" exact component={PostList}/>
        <Route path= "/post/:id" component={PostView}/>
      </Switch>
    </div>
    </Router>
  );
}

function Home(){
  return (
    <div>
      <h1>Home Page</h1>
      <h1><Link to={'/post'}>{'BLOG'}</Link></h1>
    </div>
  );
}
export default App;
