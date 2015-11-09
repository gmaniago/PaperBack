'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ShipmentModel = require('../models/ShipmentModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			shipment: null,
			placements: []
		}
	},
	componentWillMount: function() {
		var self = this;
		var query = new Parse.Query(ShipmentModel);
		query
		.get(this.props.shipmentId)
		.then(
			(shipment) => {
				var relation = shipment.relation('placements');
					relation.query().include("book").find({
					success: function(placements) {
					self.setState({shipment: shipment, placements: placements});				
			}
		})
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render() {
		return (
			<div className="container-fluid confirmation-page">
				<div className="row">
					<div className="col-md-6">
						<h2>Your books will be shipped to you soon!</h2>
						{this.renderShipment()}
						<h3>We will get them into your door in no time! Check out our rocket!</h3>
					</div>
					<div className="col-md-6">
						<img src="../images/rocket.jpg.gif" height="100%" width="100%"/>
					</div>

				</div>
			</div>
		);
	},
	renderShipment() {
      return <span>{this.state.placements.map(function(placement) {
      	return placement.get('book').get('title');
      })}</span>
	}
});