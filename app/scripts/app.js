'use strict';

var app = angular.module('toptalApp', ['ui']);
	// .config(function ($routeProvider) {
		// $routeProvider
		//   .when('/', {
		//     templateUrl: 'views/main.html',
		//     controller: 'MainCtrl'
		//   })
		//   .otherwise({
		//     redirectTo: '/'
		//   });
	// });

app.filter('default', function() {
	return function(input, value) {
		return input !== null && input !== undefined && (input !== '' || angular.isNumber(input)) ? input : value || '';
	};
});