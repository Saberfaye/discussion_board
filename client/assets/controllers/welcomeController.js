app.controller('welcomeController', ['$scope', 'usersFactory', '$location', function($scope, usersFactory, $location) {

	$scope.addUser = function() {
		usersFactory.create($scope.user, function(data) {
			if(data.errors) {
				$scope.errors = data.errors.errors;
			}
			else {
				$location.url('/dashboard');
			}
		});
	};
}]);