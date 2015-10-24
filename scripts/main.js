'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

Parse.initialize("bvFK2Tj2CFdcww2SHnZSUfaoTCY2SVGtford92Pq", "Rmj7rSWdCLkzmD6oV0ihcHLAN6g8taOGbRDn5n0c");

var RegisterComponent = require('./components/RegisterComponent');
var NavigationComponent = require('./components/NavigationComponent');
var LoginComponent = require('./components/LoginComponent');
var HomeComponent = require('./components/HomeComponent');
var FooterComponent = require('./components/FooterComponent');
var BookDetailsComponent = require('./components/BookDetailsComponent');
var BookSelectionComponent = require('./components/BookSelectionComponent');
var ConfirmationComponent = require('./components/ConfirmationComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'login': 'login',
		'register': 'register',
		'bookDetails': 'bookDetails',
		'bookSelection': 'bookSelection',
		'confirmation' : 'confirmation'
	}
	home: function() {
		ReactDOM.render(<HomeComponent />, app);
	},
	login: function() {
		ReactDOM.render(<LoginComponent router={r} />, app);
	},
	register: function() {
		ReactDOM.render(<RegisterComponent router={r} />, app);
	},
	bookDetails: function() {
		ReactDOM.render(<BookDetailsComponent router={r} />, app);
	},
	bookSelection: function() {
		ReactDOM.render(<BookSelectionComponent router={r} />, app);
	},
	confirmation: function() {
		ReactDOM.render(<ConfirmationComponent router={r} />, app);
	},

}),

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);

ReactDOM.render(
	<FooterComponent router={r} />,
	document.getElementById('footer')
);