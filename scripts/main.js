'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

Parse.initialize("lSTT4hQMyXQmxoNNI8EllvElXOiUUtt6GmNcmkph", "M8k7Z0e5PgXRqELdZ8siGFpkDUBl4fTh57nkUDbK");

var NavigationComponent = require('./components/NavigationComponent.js');
// var BooksComponent = require('./components/BooksComponent.js');
// var HomeComponent = require('./components/HomeComponent.js');
// var BookDetailsComponent = require('.components/BookDetailsComponent.js');
var LoginComponent = require('./components/LoginComponent.js');
var RegisterComponent = require('./components/RegisterComponent.js');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'login': 'login',
		'register': 'register',
	},
	home: function() {
		ReactDOM.render(
			<HomeComponent router={r} />, 
			app
		);
	// books: function() {
	// 	ReactDOM.render(
	// 		<BooksComponent router={r} />, 
	// 		app
	// 	);
	},
	login: function() {
		ReactDOM.render(
			<LoginComponent router={r} />, 
			app
		);
	},
	register: function() {
		ReactDOM.render(
			<RegisterComponent router={r} />, 
			app
		);
	},
	// bookDetails: function(id) {
	// 	ReactDOM.render(
	// 		<BookDetailsComponent router={r} postId={id} />,
	// 		app
	// 	);
	// }
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);
