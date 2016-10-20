app.controller('postController', ['$scope', 'topicsFactory', 'postsFactory', 'commentsFactory', 'usersFactory', '$location', '$routeParams', function($scope, topicsFactory, postsFactory, commentsFactory, usersFactory, $location, $routeParams) {
	$scope.new_comment = {};

	$scope.showTopic = function() {
		topicsFactory.show($routeParams.id, function(returnedData) {
			$scope.topic = returnedData;
		});
	};
	$scope.showTopic();

	$scope.showPostsToTopic = function() {
		postsFactory.showOfTopic($routeParams.id, function(returnedData) {
			$scope.posts = returnedData;
		});
	};
	$scope.showPostsToTopic();

	$scope.addPost = function() {
		postsFactory.create(usersFactory.getUser()._id, $scope.topic._id, $scope.new_post, function(data) {
			if(data.errors) {
				$scope.errors = {};
				$scope.errors.post = data.errors.errors;
			}
			else{
				$scope.new_post = {};
				$scope.showPostsToTopic();
			}
		});
	};

	$scope.addComment = function(post_id) {
		commentsFactory.create(usersFactory.getUser()._id, post_id, $scope.new_comment[post_id], function(data) {
			if(data.errors) {
				$scope.errors = {};
				$scope.errors.comment = {};
				$scope.errors.comment[post_id] = data.errors.errors;
			}
			else{
				$scope.new_comment = {};
				$scope.showPostsToTopic();
			}
		});
	};

	$scope.upVote = function(post_id) {
		postsFactory.upVote(post_id, function(data) {
			if(data.errors) {
				console.log(data.errors);
			}
			else{
				$scope.showPostsToTopic();
			}
		});
	};

	$scope.downVote = function(post_id) {
		postsFactory.downVote(post_id, function(data) {
			if(data.errors) {
				console.log(data.errors);
			}
			else{
				$scope.showPostsToTopic();
			}
		});
	};
}]);