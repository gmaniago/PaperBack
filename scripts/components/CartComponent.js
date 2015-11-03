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
	          	<table className="checkoutCart">
	          		<td><img className="image" src={book.get('image')} height="120px" width="80px"/></td>
					<td><a href={'#bookDetails/'+book.id}>{book.get('title')}</a></td>	
					<td>Quantity:{qty}</td>
					<td><button>Remove</button><br/><br/><button>Edit</button></td>
				</table>
			)
		}	
		return (
			
				<div className="checkoutContainer">
					<div >
						{placements}
					</div>
					<a href="#confirmation"><button>Ship my Books</button></a>
				</div>
			
		);
	}

});




		