
app.controller('ListCtrl', ['$scope', '$routeParams', '$location', 'backEndService', 'searchValue', 'changeTop', function($scope, $routeParams, $location, backEndService, searchValue, changeTop){

		changeTop.top(true);
		backEndService.checkUser();
		$scope.showSearch = function(){
			if(searchValue.text){
				$scope.searchResult = searchValue.text;
				return true;
			}else{
				return false;
			}
		}

		$scope.quitSearch = function(){
			searchValue.text = "";
			$location.path('/list');
		}

		$scope.news = backEndService.makeList();

		// Opens a specific article to be viewed.
		$scope.goTo = function(i){
			$location.path('/article/' + i);
		};

		// Uses removeService in script.js when called.
		$scope.removeArticle = function(id){
			if (confirm("Do you want to remove this article?")) {
				backEndService.removeArticle(id);
				$location.path('/');
			};
		};

		// Loads a specific article into editArticle to be edited.
		$scope.loadEdit = function(id){
			$location.path("/editArticle/" + id + "/" + true);
		};

		$scope.categoriesFilter = function(article){
			if($routeParams.category){
				if($routeParams.category === article.category){
					return true;
				}else{
					return false;
				}
			}
			return true;
		};

}]);

app.filter('searchFilter', function (searchValue) {
    return function (items) {
	    	var filtered = [];
	    	if(searchValue.text) {
		    	var input = angular.uppercase(searchValue.text);
		    	console.log(input);

					for (var i = 0; i < items.length; i++) {
			            if ((angular.uppercase(items[i].title).indexOf(input) !== -1) || 
			            	(angular.uppercase(items[i].text).indexOf(input) !== -1) || 
			            	(angular.uppercase(items[i].author).indexOf(input) !== -1)) {
			                filtered.push(items[i]);
			            }
			        }
		        return filtered;

    		}else {
    			return items;
    		}
    };
});


		//| filter: {author: 'Fredrik Sandberg'}
