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
				console.log(placements);
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
							<button onClick={ this.removeBook.bind(this, book) }>Remove</button>
						</td>
					</tr>					
				</tbody>
			</div>
			)
		}	
		return (		
				<div className="checkoutContainer col-sm-6 col-sm-offset-3">
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
					</table>
					<div >
						{placements}
					</div>
					<a href="#confirmation"><button id="shipBtn">Ship my Books</button></a>
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
				deleteBook.destroy();
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

});

				

