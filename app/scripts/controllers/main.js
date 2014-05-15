'use strict';

var app = angular.module('toptalApp');
app.controller('MainCtrl', function ($scope) {
	var map = null,marker = null;
	var showLocationInMap = function(lat,lon){
		var divMap = document.getElementById('map');
		var center = new google.maps.LatLng(lat,lon);
		if(map===null){
			map = new google.maps.Map(divMap,{
				center: center,
				zoom:12,
				mapTypeId:'roadmap',
				disableDefaultUI: true
			});	
			marker = new google.maps.Marker({
				map: map,
				position: center
			});
		}else{
			if(marker!==null){
				marker.setMap(null);
			}
			map.panTo(center);
			marker = new google.maps.Marker({
				map: map,
				position: center
			});
			
		}
		var html;
		if(divMap.children.length > 0){
			divMap.children[0].remove();
		}
		var div = document.createElement('div');
		div.className = 'overlay';
		if($scope.userData.name!==undefined){
			html = '<p class="small">'+$scope.userData.name+' lives in '+$scope.userData.address+'</p>';
		}else{
			html = '<p class="small"> lives in '+$scope.userData.address+'</p>';		
		}
		div.innerHTML = html;		
		divMap.appendChild(div);
	};

	$scope.userData = {
		'skills':[]
	};

	
	$scope.$watch('userData.location',function(){
		if($scope.userData.location !== undefined){
			var lat = $scope.userData.location.latitude;
			var lon = $scope.userData.location.longitude;
			showLocationInMap(lat,lon);	
		}
		
	});
});
