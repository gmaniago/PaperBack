'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	render() {

		return (
			<div className="container-fluid confirmation-page">
				<div className="row">
					<div className="col-md-6">
						<h2>Your books will be shipped to you soon!</h2>
						<h3>We will get them into your door in now time! Check out our rocket!</h3>
					</div>
					<div className="col-md-6">
						<img src="../images/rocket.jpg.gif" height="100%" width="100%"/>
					</div>
				</div>
			</div>
		);
	}
});