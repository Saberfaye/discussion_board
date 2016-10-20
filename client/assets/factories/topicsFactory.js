app.factory('topicsFactory', ['$http', function($http) {
	var topics = [];
	var categories = ["MySQL", "Ruby on Rails", "Web Development", "MongoDB", "Python", "Node.JS", "Angular", "Java"];

	function TopicConstructor() {
		var _this = this;

		this.getCategories = function() {
			return categories;
		}

		this.index = function(callback) {
			$http.get('/topics').then(function(returned_data){
				topics = returned_data.data;
				callback(returned_data.data);
			});
		};

		this.show = function(id, callback) {
			$http.get('/topics/'+id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.create = function(user_id, newTopic, callback) {
			$http.post('/topics/'+user_id, newTopic).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		};

		// this.update = function(id, updateFriend, callback) {
		// 	$http.put('/friends/'+id, updateFriend).then(function(returned_data){
		// 		if (typeof(callback) == 'function'){
		// 			callback(returned_data);
		// 		}
		// 	});
		// }

		// this.delete = function(id, callback) {
		// 	$http.delete('/friends/'+id).then(function(returned_data){
		// 		if (typeof(callback) == 'function'){
		// 			friends = returned_data.data;
		// 			callback(returned_data.data);
		// 		}
		// 	});
		// }
	}
	/*
	What is this factory returning?  Could we extend this code to be reused?
	*/
	return (new TopicConstructor());
}]);