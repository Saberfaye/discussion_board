var users = require('../controllers/users.js');
var topics = require('../controllers/topics.js');
var posts = require('../controllers/posts.js');
var comments = require('../controllers/comments.js');
var path = require('path');

module.exports = function(app){
	app.get('/users', function(req, res) {
		users.index(req, res);
	})
	app.get('/users/:id', function(req, res) {
		users.show(req, res);;
	})
	app.post('/users', function(req, res) {
		users.create(req, res);
	})
	app.get('/topics', function(req, res) {
		topics.index(req, res);
	})
	app.get('/topics/:id', function(req, res) {
		topics.show(req, res);
	})
	app.post('/topics/:user_id', function(req, res) {
		topics.create(req, res);
	})
	app.get('/posts/:topic_id', function(req, res) {
		posts.showOfTopic(req, res);
	})
	app.post('/posts/:user_id/:topic_id', function(req, res) {
		posts.create(req, res);
	})
	app.get('/posts/vote/:post_id/:action', function(req, res) {
		posts.updateVote(req, res);
	})
	app.get('/posts/:topic_id', function(req, res) {
		posts.showOfTopic(req, res);
	})
	app.post('/comments/:user_id/:post_id', function(req, res) {
		comments.create(req, res);
	})

	app.get('/*', function(req, res) {
		res.sendFile(path.join(__dirname, '../../client/index.html'));
	})
}