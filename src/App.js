import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import PostList from './components/posts/PostList'
import PostView from './components/posts/PostView'
import './App.css';

function App() {
  return (
    <Router>
      
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/posts" exact component={PostList}/>
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
      <h1><Link to={'/posts'}>{'BLOG'}</Link></h1>
    </div>
  );
}

export default App;
