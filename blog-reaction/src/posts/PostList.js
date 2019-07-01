import React, {Component} from 'react'
import PostData from '../data/posts.json'

import {BrowserRouter as Router, Link} from 'react-router-dom';
class PostList extends Component {
	// constructor(props){
	// 	super(props);
	// }

	render() {
		return (
			<div>
				<Router>
					
				<h1>Hello Posts</h1>

				<Link to='/home' >Home</Link>
				{PostData.map((postDetail, index)=>{
					return <div key={postDetail.id}>
						<h1 > 
							<Link to={`/post/${postDetail.id}`}>
								{postDetail.title}
							</Link>
						</h1>
					</div>
				})}
				</Router>
			</div>
			);
	}
}


export default PostList