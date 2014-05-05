'use strict';
var app = angular.module('toptalApp');

app.directive('ttEditable', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			editModel:'=ngModel',
			text:'@'
		},
		templateUrl:'/scripts/templates/ttEditable.html',
		link:function(scope,element,attrs){
			scope.editorEnabled = false;
			var input = element.find('input');
			var span = element.find('span');
			var type = attrs.type;

			scope.enableEditor = function(){
				scope.editorEnabled = true;
				span.parent().addClass('noHover');
				setTimeout(function(){
					input[0].focus();
					input[0].select();
				},100);
			};



			scope.unEdit = function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				if(type==='address'){
					if(scope.editModel.length > 0){
						var geocoder = new google.maps.Geocoder();
						geocoder.geocode({'address':scope.editModel},function(results,status){
							if(status === google.maps.GeocoderStatus.OK){
								scope.editModel = results[0].formatted_address;
								var loc = results[0].geometry.location;
								scope.$parent.userData.location = {'latitude':loc.lat(),'longitude':loc.lng()};
								scope.$apply();
							}	
						});
					}
				}
				scope.editorEnabled = false;
				span.parent().removeClass('noHover'); 	
			};


		}
		
	};
});