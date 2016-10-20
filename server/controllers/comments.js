var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

function CommentsController(){
	this.index = function(req, res){
		Comment.find({})
		.populate('_user')
		.exec(function(err, posts){
			if(err){
				res.json({error: true, errors: err})
			}
			else {
				res.json(comments);
			}
		})		
	}

	this.show = function(req, res) {
		Comment.findOne({_id: req.params.id}, function(err, comment) {
			if(err){
				res.json({error: true, errors: err});
			}
			else {
				res.json(comment);
			}
		});
	};

	this.create = function(req, res){
		User.findOne({_id: req.params.user_id}, function(err, user){
			Post.findOne({_id: req.params.post_id}, function(err, post){
				req.body._user = req.params.user_id;
				req.body._post = req.params.post_id;
				Comment.create(req.body, function(err, comment){
					if(err){
						res.json({error: true, errors: err});
					}
					else {
						user.comments.push(comment);
						user.save(function(err) {
							if(err){
								res.json({error: true, errors: err});
							}
							else {
								post.comments.push(comment);
								post.save(function(err) {
									if(err){
										res.json({error: true, errors: err});
									}
									else {
										res.json(comment);
									}
								});
							}
						});
					}
				});
			});
		});
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

module.exports = new CommentsController();
