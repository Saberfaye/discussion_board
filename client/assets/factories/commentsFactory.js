app.factory('commentsFactory', ['$http', function($http) {
	var comments = [];
	var comment = {};

	function CommentConstructor() {
		var _this = this;

		this.index = function(callback) {
			$http.get('/comments').then(function(returned_data){
				comments = returned_data.data;
				callback(returned_data.data);
			});
		};

		this.show = function(id, callback) {
			$http.get('/comments/'+id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			});
		}

		this.create = function(user_id, post_id, newComment, callback) {
			$http.post('/comments/'+user_id+'/'+post_id, newComment).then(function(returned_data){
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
	return (new CommentConstructor());
}]);