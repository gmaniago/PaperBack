var React = require('react');
var ReactDOM = require('react-dom');
var PostModel = require('../models/BooksModel.js');
var moment = require('moment')

module.exports = React.createClass({

	render: function() {
		return (
			<div>			
				<form className="postForm" onSubmit={this.onAddBook}>
					<h2 className="pageHeader">Add a Book</h2>
					<input type="text" ref="title" placeholder="title" />
					<br />
					<textarea ref="description" placeholder="write a small description"></textarea>
					<br />
					<input type="text" ref="author" placeholder="author" />
					<br />
					<input type="url" ref="image" placeholder="Image Link" />		
					<br />			
					<button>Add Book</button>
				</form>
			</div>
			)
	},
	onAddBook: function(e) {
		e.preventDefault();
		var newBook = new BooksModel({
			title: this.refs.title.value,
			description: this.refs.body.value,
			image: this.refs.image.value,
			author: this.refs.author.value,
		});

		newBook.save();
		console.log('book saved')
		this.props.router.navigate('', {trigger: true});
	}


})



