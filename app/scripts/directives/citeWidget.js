'use strict';
var app = angular.module('toptalApp');
app.directive('ttCiteWidget',function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			editModel:'=ngModel'
		},
		templateUrl:'/scripts/templates/ttCiteWidget.html',
		link:function(scope,element){
			scope.widgetEnabled = false;
			scope.widgetEnded = false;
			scope.enableEditor = function(){
				scope.widgetEnabled = true;
			};

			scope.disableEditor = function(){
				scope.widgetEnabled = false;
				scope.widgetEnded = true;
			};
		}
	}
});