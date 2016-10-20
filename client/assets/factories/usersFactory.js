app.factory('usersFactory', ['$http', function($http) {
	var users = [];
	var user = {};

	function UserConstructor() {
		this.getUser = function() {
			return user;
		}

		this.index = function(callback) {
			$http.get('/users').then(function(returned_data){
				users = returned_data.data;
				callback(users);
			});
		};

		this.show = function(id, callback) {
			$http.get('/users/'+id).then(function(returned_data){
				if (typeof(callback) == 'function'){
					console.log(returned_data.data);
					callback(returned_data.data);
				}
			});
		}

		this.create = function(newUser, callback) {
			$http.post('/users', newUser).then(function(returned_data){
				if (typeof(callback) == 'function'){
					user = returned_data.data;
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
	return (new UserConstructor());
}]);