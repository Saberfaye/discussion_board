app.controller('topicController', ['$scope', 'topicsFactory', 'usersFactory', '$location', function($scope, topicsFactory, usersFactory, $location) {
	$scope.user = usersFactory.getUser();
	$scope.categories = topicsFactory.getCategories();

	$scope.showTopics = function() {
		topicsFactory.index(function(returned_topics) {
			$scope.topics = returned_topics;
		});
	};
	$scope.showTopics();

	$scope.addTopic = function(id) {
		topicsFactory.create($scope.user._id, $scope.new_topic, function(data) {
			if(data.errors) {
				$scope.errors = data.errors.errors;
			}
			else {
				$scope.new_topic = {};
				$scope.showTopics();
			}
		});
	};

	$scope.propertyName = "createdAt";
	$scope.reverse = false;

	$scope.sortBy = function(propertyName) {
		$scope.reverse = (propertyName !== null && $scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};
}]);