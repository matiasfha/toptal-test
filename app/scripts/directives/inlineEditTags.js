'use strict';
var app = angular.module('toptalApp');

app.directive('ttEditableTags', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			parentModel:'=ngModel',
			text:'@'
		},
		templateUrl:'/scripts/templates/ttEditableTags.html',
		link:function(scope,element){
			scope.editorEnabled = false;
			scope.options = [
				{val:'strong',label:'Strong'},
				{val:'normal',label:'Normal'},
				{val:'basic',label:'Basic'}
			];
			scope.typeModel = scope.options[0];

			var input = element.find('input');
			
			scope.enableEditor = function(){
				scope.editModel = '';
				scope.editorEnabled = true;
				setTimeout(function(){
					input[0].focus();
					input[0].select();
				},100);
			};


			scope.remove = function(idx){
				scope.parentModel.splice(idx,1);
			};

			scope.unEdit = function($event) {
				if($event!==undefined){
					$event.preventDefault();
					$event.stopPropagation();	
				}
				
				if(scope.editModel.length > 0){
					scope.parentModel.push({
						type:scope.typeModel.val,
						value:scope.editModel
					});
					scope.editorEnabled = false;	
				}
				
			};


		}
		
	};
});