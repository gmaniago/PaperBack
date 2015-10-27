var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
	render: function(){
		return (
			<div class="book">
				<a href="#" class="img"><img src="<%= (volumeInfo.imageLinks.thumbnail) %>" /></a>
			</div>
		);
	}
	
})