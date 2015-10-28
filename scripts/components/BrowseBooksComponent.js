var React = require('react');
var ReactDOM = require('react-dom');
var BooksModel = require('../models/BooksModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return{
			books: []
		};
	},
	componentWillMount: function() {
		var query = new Parse.Query(BooksModel);
		query
		.descending('createdAt')
		.find()
		.then(
			(books) => {
				this.setState({books: books});
			},
			(err) => {
				console.log(err)
			}
		)

	},
	render: function() {
		var browseContent = this.state.books.map(function(book) {
			console.log(book);
			return (
				<div>
					<a className="allBooks" href={'#bookDetails/' + book.id}>
						<div className="singleBook">
							<h3 className="title">{book.get('title')}</h3>
							<img className="mainImage" src={book.get('image')} />
						</div>
					</a>
				</div>
			)
		})
		return (
			<div>
				<h3>Recent Posts Thread:</h3><br/>
				{browseContent}
			</div>
			)
	}


})

