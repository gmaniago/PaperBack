var React = require('react');
var ReactDOM = require('react-dom');
var $ = require ('jquery');

var UserModel = require('../models/UserModel');
var BooksModel = require('../models/BooksModel');
var CartPlacementModel = require('../models/CartPlacementModel.js');

var query = new Parse.Query(CartPlacementModel);

module.exports = React.createClass({
	getInitialState: function() {
		return { 
			user: Parse.User.current(),
			placements: {}
		};
	},
	componentWillMount: function() {
		query.equalTo('user', Parse.User.current());
        query.include("book");
		query.find({
			success: (original_placements) => {
				var placements = {}
				original_placements.map(function(placement) { 
					var book_id = placement.get('book').id;
					if (placements[book_id]) {
                       placements[book_id].push(placement)
					} else {
						placements[book_id] = [placement]
					}
				})
        		this.setState({
					placements: placements
				});
   			},
		});	
	},
	render: function() {
		var placements = [];
		for (var book_id in this.state.placements) {
          var book = this.state.placements[book_id][0].get('book')
          var qty = this.state.placements[book_id].reduce(function(sum, cur) {
          	return cur.get('qty') + sum
          }, 0)
          placements.push(	
	        <div id={book.id} className="checkoutCart col-sm-6 col-sm-offset-2">
	          	<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th>
								Book Title
							</th>
							<th>
								Quantity
							</th>
							<th>
								Edit
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<img className="image" src={book.get('image')} height="120px" width="80px"/>
								<a href={'#bookDetails/'+book.id}>{book.get('title')}</a>
							</td>		
							<td>
								{qty}
							</td>
							<td>
								<button className="removebutton" onClick={ this.removeBook.bind(this, book) }>Remove</button>
							</td>
						</tr>					
					</tbody>
				</table>
			</div>
			)
		}	
		return (		
				<div className="checkoutContainer">
					<div >
						{placements}
					</div>
					<a href="#confirmation"><button id="shipBtn" onClick={this.shipBook.bind(placements)}>Ship my Books</button></a>
				</div>
			
		);
	},
	removeBook: function(book) {
		query.equalTo('user', Parse.User.current());
		query.equalTo('book', book).
		limit(1).
		find({
			success: (books) => {
				var deleteDiv = document.getElementById(""+book.id);
				deleteDiv.className= "removeDiv";
				var deleteBook = books[0];
				console.log(book.id);
				deleteBook.destroy();
			},
			error: (error) => {
				console.log(error);
			}
		});
	},
	shipBook: function(placements) {
		$(".removebutton").click();
		 for(var book_id in this.state.placements){
		 var delbook = this.state.placements[book_id][0].get('book');
		 console.log("deletebook");
		 console.log(delbook);
		 query.equalTo('user', Parse.User.current());
		 query.equalTo('book', delbook);
		 query.limit(1).
		find({
			success: (books) => {
				console.log("books from server");
				console.log(books.length);
				console.log(books);
					var book = books[0];
					console.log(book.id);
					var deleteDiv = document.getElementById(""+book.id);
				deleteDiv.className= "removeDiv";
				 
				book.destroy();
				
			},
			error: (error) => {
				console.log(error);
			}
		});
	      };
		


	}

});




		