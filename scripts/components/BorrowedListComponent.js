var React = require('react');
var ReactDOM = require('react-dom');
var $ = require ('jquery');

var UserModel = require('../models/UserModel');
var BooksModel = require('../models/BooksModel');
var CheckOutModel = require('../models/CheckOutModel');

var query = new Parse.Query(UserModel);
var query2 = new Parse.Query(BooksModel);

module.exports = React.createClass({
	getInitialState: function() {
		return { 
			user: null,
			books: []
		};
	},
	componentWillMount: function() {
		query.equalTo('user', Parse.User.Current().id)
		.first({
			success: (result) => {
        		this.setState({
					user: result
				});
   			},
		});
		query2.equalTo('user', ''+this.props.books+'');
		query2.find({
				success: (result) => {
	        		that.setState({
						books: result
					});	
				}
			});			
	},
	render: function() {
		var borrowedBooks = this.state.books
		.map(function(book) {
		return (

			<div className="books">
				<div><h2><a href={'#bookDetails/'+book.id}>{post.get('title')}</a></h2></div>	
				<div>{book.get('description')}</div>
				<div><img className="image" src={post.get('image')} /></div>
			</div>
			);
		});

		var content = <img className="loading" src="http://4vector.com/thumb_data/v4l-133092.jpg"/>
		if(this.state.user) {
			content = (
					<div>
						<div><h2>Hello {this.state.user.get('username')}. Here are your selections</h2></div>
					</div>
			)
		}
		return (
			
				<div>
					<div >
						{borrowedBooks}
					</div>
					<div>
						{content}					
					</div>
				</div>
			
		);
	}

});




		