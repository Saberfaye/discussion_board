var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

function TopicsController(){
	this.index = function(req, res){
		Topic.find({})
		.populate('_user')
		.exec(function(err, topics){
			if(err){
				res.json({error: true, errors: err})
			}
			else {
				res.json(topics);
			}
		});
	}

	this.show = function(req, res) {
		Topic.findOne({_id: req.params.id})
		.populate('_user')
		.exec(function(err, topic) {
			if(err){
				res.json({error: true, errors: err});
			}
			else {
				res.json(topic);
			}
		});
	};

	this.create = function(req, res){
		User.findOne({_id: req.params.user_id}, function(err, user){
			req.body._user = user._id;
			Topic.create(req.body, function(err, topic){
				if(err){
					res.json({error: true, errors: err});
				}
				else {
					user.topics.push(topic);
					user.save(function(err) {
						if(err){
							res.json({error: true, errors: err});
						}
						else {
							res.json(topic);
						}
					});
				}
			})
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

module.exports = new TopicsController();
