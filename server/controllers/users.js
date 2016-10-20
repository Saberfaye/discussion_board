var mongoose = require('mongoose');
var User = mongoose.model('User');

function UsersController(){
	this.index = function(req, res){
		User.find({}, function(err, users){
			if(err){
				res.json({error: true, errors: err})
			}
			else {
				res.json(users);
			}
		})		
	}

	this.show = function(req, res) {
		User.findOne({_id: req.params.id}, function(err, user) {
			if(err){
				res.json({error: true, errors: err});
			}
			else {
				res.json(user);
			}
		});
	};

	this.create = function(req, res){
		User.findOne({name: req.body.name}, function(err, user) {
			if(user) {
				res.json(user);
			}
			else {
				User.create(req.body, function(err, user){
					if(err){
						res.json({error: true, errors: err});
					}
					else {
						res.json(user);
					}
				})
			}
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

module.exports = new UsersController();
