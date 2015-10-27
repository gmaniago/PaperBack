'use strict';
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return(
			<section className="homeContent">
				<div className="hero">
					<h1>PaperBack</h1>
					<h3>With PaperBack you will be able to explore a vast library of books. <br />When you're done you can mail it back at no cost and choose another one to enjoy.</h3>
					<h4><a href='#register' className="freeMonth">Start your free month.</a></h4>
				</div>
			</section>

		)
	}

});