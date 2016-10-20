app.controller('userController', ['$scope', 'usersFactory', '$location', '$routeParams', function($scope, usersFactory, $location, $routeParams) {
	
	$scope.showUser = function() {
		usersFactory.show($routeParams.id, function(user) {
			$scope.user = user;
		})
	};
	$scope.showUser();

}]);