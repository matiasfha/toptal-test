'use strict';
var app = angular.module('toptalApp');
app.directive('ttPortfolioWidget',function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			editModel:'=ngModel'
		},
		templateUrl:'/scripts/templates/ttPortfolioWidget.html',
		link:function(scope,element){
			scope.widgetEnabled = false;
			scope.enableEditor = function(){
				scope.widgetEnabled = true;
			};
			console.log(element);
		}
	};
});