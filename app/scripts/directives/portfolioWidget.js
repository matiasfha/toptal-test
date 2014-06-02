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
		controller:function($scope,$element){
			$scope.projects = {};
			var object = null;
			for(var i=0;i<7;i++){
				object = {
					name:'',
					skills:[]
				};
				$scope.projects[i] = object
			}
			
		},
		link:function(scope,element){
			scope.widgetEnabled = false;
			scope.portfolioEnded = false;

			scope.enableEditor = function(){
				scope.widgetEnabled = true;
			};

			scope.disableEditor = function(){
				
				var skills = [];
				for(var key in scope.projects){
					try{
						var s = scope.projects[key].skills.split(',');
						for(var i=0,len=s.length;i<len;i++){
							skills.push(s[i].trim());
						}
					}catch(e){}
				}
				skills.sort();
				if(skills.length > 3){
					scope.skills = skills.slice(0,2).join(", ");
				}
				scope.widgetEnabled = false;
				scope.portfolioEnded = true;
				
			}
			
		}
	};
});