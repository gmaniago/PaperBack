var React = require('react');
var ReactDOM = require('react-dom');
var BooksModel = require('../models/BooksModel.js');
var FilterComponent = require('./FilterComponent');
var _ = require('backbone/node_modules/underscore');

module.exports = React.createClass({
	getInitialState: function() {
		return{
			books: [],
			filterText: '',
			categories: 'choose',
			filteredBooks: []
		};
	},
	componentWillMount: function() {
		var query = new Parse.Query(BooksModel);
		query
		.descending('createdAt')
		.find()
		.then(
			(books) => {	
				var filteredCategories = _.uniq(books, function(book){
					return book.get('category');
				});
				var browseCategories = filteredCategories.map(function(book) {
					return (
						<option key={book.id}>{book.get('category')}</option>
					)
				});
				this.setState({books: books, categories: browseCategories});
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
					}
				)		
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var books = this.state.filteredBooks.length === 0 ? this.state.books : this.state.filteredBooks;
		var browseContent = books.map(function(book) {
			return (
					<div className="allBooks"><a href={'#bookDetails/' + book.id}>
						<div className="singleBook hover01">
							<figure><img className="mainImage" src={book.get('image')}height="300px" width="200px" border="0px"/></figure>
							<h3 className="title">{book.get('title')}</h3>
						</div></a>
					</div>
			)
		})
		return (
			<div>
					<div className="top_hero">
						<div className="top_hero_ul">
						    <ul>
						      <li className="top_hero_item1">Take your mind off some things.</li>
						      <li className="top_hero_item2">Go ahead. Enjoy some free time.</li>
						     </ul>
						</div>
						<div className="filter-container">
							<FilterComponent filterVal={this.state.filterText} filterUpdate={this.stateUpdate} />
						</div>
						<div className="category-search-container">
							<select ref="category" onChange={this.categoryPick}>
								<option>Categories</option>
								{this.state.categories}
							</select>
						</div>
					</div>

				<h3 id="browseBooks">Browse Books</h3><br/>
				<div className="bookList row">
					{browseContent}
				</div>
			</div>
		)
	},
	categoryPick: function() {
		console.log(this.state.books);
		var category = this.refs.category.value;
		console.log(category);
		var newCategory = this.state.books.filter((book) => {
			return book.get('category') === category;
		})
		this.setState({filteredBooks: newCategory})
	}
})


