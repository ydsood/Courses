import React, {Component} from 'react';
import {connect} from 'react-redux';

/*class CommentList extends Component{
	render(){
		return (
				<ul className="comment-list">
					Comment List
				</ul>
			);
	}
}*/


const CommentList = (props)=>{

	const list = props.comments.map(comment => <li key={comment}>{comment}</li>);

	return (
			<ul className = "comment-list"> {list} </ul>
		)
};

function mapStateToProps(state){
	return {comments : state.comments}
}


export default connect(mapStateToProps)(CommentList);