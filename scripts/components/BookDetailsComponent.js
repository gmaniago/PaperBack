
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
	render: function(){
		return (
	<section>
		<div id="detail-view-template" class="fade" style="display: none;">
			<a class="close-detail" href="#">&#8855;</a>
			<div class="wrap-book">
				<div class="book">
					<img src="<%= (volumeInfo.imageLinks.small ? volumeInfo.imageLinks.small : volumeInfo.imageLinks.thumbnail) %>" />
				</div>
			</div><!-- //wrap-book -->

			<div id="wrap-info">
				<%= (volumeInfo.title ? '<h1>'+volumeInfo.title+'</h1>' : '') %>
				<%= (volumeInfo.subtitle ? '<h3>'+volumeInfo.subtitle+'</h3>' : '') %>
				<%= (volumeInfo.authors ? '<br /><strong>Author: '+volumeInfo.authors+'</strong>' : '') %>
				<%= (volumeInfo.publisher ? '<br /><strong>Published by, '+volumeInfo.publisher+'</strong>' : '') %>
				<%= (volumeInfo.description ? '<div class="description"><div class="more-block">'+volumeInfo.description+'</div></div>' : '<p>No description found</p>') %>
				<%= (localstorage && !localbook ? '<a class="btn save-book" href="#">+ Add</a>' : '') %>
				<%= (localstorage && localbook ? '<a class="btn remove-book" href="#">- Delete</a>' : '') %>
			</div><!-- //wrap-info -->
			<div>
				<a href='3#'>Add to Cart</a>
			</div>
		</div>
	</section>
		);
	}
	
})