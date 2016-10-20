app.factory('postsFactory', ['$http', function($http) {
	var posts = [];
	var post = {};

	function PostConstructor() {
		var _this = this;

		this.index = function(callback) {
			$http.get('/posts').then(function(returned_data){
				posts = returned_data.data;
				callback(posts);
			});
		};

		this.showOfTopic = function(topic_id, callback) {
			$http.get('/posts/'+topic_id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.show = function(id, callback) {
			$http.get('/posts/'+id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.create = function(user_id, topic_id, newPost, callback) {
			$http.post('/posts/'+user_id+'/'+topic_id, newPost).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		};

		this.upVote = function(post_id, callback) {
			$http.get('/posts/vote/'+post_id+'/1').then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		};

		this.downVote = function(post_id, callback) {
			$http.get('/posts/vote/'+post_id+'/2').then(function(returned_data){
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
	return (new PostConstructor());
}]);