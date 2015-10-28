'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

Parse.initialize("bvFK2Tj2CFdcww2SHnZSUfaoTCY2SVGtford92Pq", 
	"Rmj7rSWdCLkzmD6oV0ihcHLAN6g8taOGbRDn5n0c");

var NavigationComponent = require('./components/NavigationComponent.js');
var BooksComponent = require('./components/BooksComponent.js');
var HomeComponent = require('./components/HomeComponent.js');
var BookDetailsComponent = require('./components/BookDetailsComponent.js');
var LoginComponent = require('./components/LoginComponent.js');
var RegisterComponent = require('./components/RegisterComponent.js');
var AddBooksComponent = require('./components/AddBookComponent.js');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'login': 'login',
		'register': 'register',
		'books': 'books',
		'addBook': 'addBook',
		'bookDetails': 'bookDetails'
	},
	home: function() {
		ReactDOM.render(
			<HomeComponent router={r} />, 
			app
		);
	},
	books: function() {
		ReactDOM.render(
			<BooksComponent router={r} />, 
			app
		);
	},
	addBook: function() {
	ReactDOM.render(
			<AddBooksComponent router={r} />, 
			app
		);
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
	bookDetails: function(id) {
		ReactDOM.render(
			<BookDetailsComponent router={r} postId={id} />,
			app
		);
	}
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);

