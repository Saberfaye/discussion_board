var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

function PostsController() {
	this.index = function(req, res) {
		Post.find({})
		.populate('_user')
		.exec(function(err, posts) {
			if(err){
				res.json({error: true, errors: err});
			}
			else {
				res.json(posts);
			}
		})		
	}

	this.showOfTopic = function(req, res) {
		Post.find({_topic: req.params.topic_id})
		.populate({
			path:'comments',
			model:'Comment',
			populate: {
				path:'_user',
				model:'User'
			}
		})
		.populate({
			path:'_user',
			model:'User'
		})
		.exec(function(err, posts) {
			if(err){
				res.json({error: true, errors: err});
			}
			else {
				res.json(posts);
			}
		})		
	}

	// this.show = function(req, res) {
	// 	Post.findOne({_id: req.params.id}, function(err, post) {
	// 		if(err){
	// 			res.json({error: true, errors: err});
	// 		}
	// 		else {
	// 			res.json(post);
	// 		}
	// 	});
	// };

	this.create = function(req, res) {
		User.findOne({_id: req.params.user_id}, function(err, user){
			req.body.up_vote = 0;
			req.body.down_vote = 0;
			req.body._user = req.params.user_id;
			req.body._topic = req.params.topic_id;

			Topic.findOne({_id: req.params.topic_id}, function(err, topic){
				Post.create(req.body, function(err, post){
					if(err){
						res.json({error: true, errors: err});
					}
					else {
						user.posts.push(post);
						user.save(function(err) {
							if(err){
								res.json({error: true, errors: err});
							}
							else {
								topic.posts.push(post);
								topic.save(function(err) {
									if(err){
										res.json({error: true, errors: err});
									}
									else {
										res.json(post);
									}
								});
							}
						});
					}
				});
			});
		});
	}

	this.updateVote = function(req, res) {
		if(req.params.action == 1) {
			Post.update({_id: req.params.post_id}, {$inc: {up_vote: 1}}, function(err, post) {
				if(err){
					res.json({error: true, errors: err});
				}
				else {
					res.json(post);
				}
			});
		}
		else {
			Post.update({_id: req.params.post_id}, {$inc: {down_vote: 1}}, function(err, post) {
				if(err){
					res.json({error: true, errors: err});
				}
				else {
					res.json(post);
				}
			});
		}
		
	}

	// this.update = function(req, res) {
	// 	Friend.update({_id: req.params.id}, req.body, function(err) {
	// 		if(err) {
	// 			console.log("Error Updating");
	// 		}
	// 		else {
	// 			Friend.find({}, function(err, data) {
	// 				res.json(data);
	// 			});
	// 		}
	// 	});
	// };

	// this.delete = function(req, res){
	// 	Friend.remove({_id: req.params.id}, function(err){
	// 		if(err) {
	// 			console.log("Error Deleting");
	// 		}
	// 		else {
	// 			Friend.find({}, function(err, data) {
	// 				res.json(data);
	// 			});
	// 		}
	// 	});
	// };
	
}

module.exports = new PostsController();
