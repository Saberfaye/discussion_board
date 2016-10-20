var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/partials/welcome.html',
		controller: 'welcomeController'
	})
	.when('/dashboard', {
		templateUrl: '/partials/topics.html',
		controller: 'topicController'
	})
	.when('/topics/:id', {
		templateUrl: '/partials/posts.html',
		controller: 'postController'
	})
	.when('/users/:id', {
		templateUrl: '/partials/show_user.html',
		controller: 'userController'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
});