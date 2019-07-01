import React, {Component} from 'react'
import PostData from '../data/posts.json'
class PostList extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Hello Posts</h1>
				{PostData.map((postDetail, index)=>{
					return <div>
						<h1>{postDetail.title}</h1>
						<p>{postDetail.content}</p>
						<ul> </ul>
					</div>
				})}
			</div>
			);
	}
}


export default PostList