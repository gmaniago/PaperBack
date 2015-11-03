var React = require('react');
var ReactDOM = require('react-dom');
var BooksModel = require('../models/BooksModel.js');
var FilterComponent = require('./FilterComponent');

module.exports = React.createClass({
	getInitialState: function() {
		return{
			books: [],
			filterText: ''
		};
	},
	componentWillMount: function() {
		/*Parse.Cloud.beforeSave("books", function(request, response) {
			request.object_set(
				"title_lowercase",
				request.object.get("title").toLowerCase()
			);

			response.success();
		});*/

		var query = new Parse.Query(BooksModel);
		query
		.descending('createdAt')
		.find()
		.then(
			(books) => {
				this.setState({books: books});
			},
			(err) => {
				console.log(err);
			}
		);

	},
	stateUpdate(value) {
		this.setState({ filterText: value });



		var query = new Parse.Query(BooksModel);
		query
		.descending('createdAt')
		.contains("title", value)
		.find()
		.then(
			(books) =>  {
				//this.setState({books: books});

				query = new Parse.Query(BooksModel);
				query.descending('createdAt')
				.contains('author', value)
				.find()
				.then(
					(authorBooks) => {
						books = books.concat(authorBooks);
						this.setState({books: books});
					},
					(err) => {
						console.log(err);
						this.setState({books: books});
					}
				)
			
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var browseContent = this.state.books.map(function(book) {
			return (

					<div className="allBooks "><a href={'#bookDetails/' + book.id}>
						<div className="singleBook">
							<img className="mainImage" src={book.get('image')}height="300px" width="200px" border="0px"/>
							<h3 className="title">{book.get('title')}</h3>
						</div></a>
					</div>
			)
		})
		return (
			<div>
				<div className="filter-container">
					<FilterComponent filterVal={this.state.filterText} filterUpdate={this.stateUpdate} />
				</div>
				<h3 id="browseBooks">Browse Books</h3><br/>
				<div className="bookList row">
					{browseContent}
				</div>
			</div>
			)
	}


})


