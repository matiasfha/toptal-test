'use strict';
var app = angular.module('toptalApp');
app.directive('ttUploadImage',function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			parentModel:'=ngModel',
			text:'@'
		},
		templateUrl:'/scripts/templates/ttUploadImage.html',
		link:function(scope,element){
			scope.editorEnabled = false;
						
			scope.enableEditor = function(){
				scope.editModel = '';
				scope.editorEnabled = true;
				setTimeout(function(){
					element.find('button')[0].focus();
				});
			};

			scope.unEdit = function($event){
				if($event!==undefined){
					$event.preventDefault();
					$event.stopPropagation();
				}
				scope.editorEnabled = false;
			};

			scope.selectFile = function($event){
				element.find('input')[0].click();
				$event.stopPropagation();
				$event.preventDefault();

			};

			scope.onFileSelect = function($files){
				var file = $files[0];
				var img = document.createElement('img');
				img.file = file;
				img.width = 240;
				img.height = 240;
				scope.editModel = 'C:\\images\\'+file.name;
				document.querySelector('.picture-container').innerHTML='';
				document.querySelector('.picture-container').appendChild(img);
				var reader = new FileReader();
				reader.onload = (function(aImg,s){
					return function(e){
						aImg.src = e.target.result;
						s.editorEnabled = false;
						s.text = '';
						s.$apply();
					};
				})(img,scope);
				reader.readAsDataURL(file);
			};

			
		}
	};
});

app.directive('ngFileSelect', [ '$parse', '$timeout', function($parse, $timeout) {
	return function(scope, elem, attr) {
		var fn = $parse(attr.ngFileSelect);
		elem.bind('change', function(evt) {
			var files = [], fileList, i;
			fileList = evt.target.files;
			if (fileList !== null) {
				for (i = 0; i < fileList.length; i++) {
					files.push(fileList.item(i));
				}
			}
			$timeout(function() {
				fn(scope, {
					$files : files,
					$event : evt
				});
			});
		});
		
	};
}]);