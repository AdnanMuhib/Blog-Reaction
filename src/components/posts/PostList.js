import React, {Component} from 'react'
import PostData from '../../data/posts.json'

import {Link} from 'react-router-dom';
class PostList extends Component {
	render() {
		return (
			<div>
				<h1>Blog Posts</h1>

				<Link to='/Blog-Reaction/home' >Home</Link>
				{PostData.map((postDetail, index)=>{
					return <div key={postDetail.id}>
						
							<Link to={`/Blog-Reaction/post/${postDetail.id}`}>
								{postDetail.title}
							</Link>
					</div>
				})}
			</div>
			);
	}
}


export default PostList