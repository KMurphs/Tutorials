import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



class PostList extends Component {
	constructor(props){
		super(props)
		this.state = {
			posts: []
		}
	}

	componentDidMount(){
		axios.get("https://techcrunch.com/wp-json/wp/v2/posts")
		.then(posts => {
			this.setState({
				posts: posts.data
			})
		})
	}
}

export default PostList;