
app.controller('editArticleCtrl', ['$scope', '$routeParams', '$location','backEndService', '$firebaseArray', 'changeTop',
	function($scope, $routeParams, $location, backEndService, $firebaseArray, changeTop){

	changeTop.top(false);
	scroll(0,0);
	
	// var categoriesRef =  new Firebase('https://grupp4news.firebaseio.com/categories');
	$scope.categories = backEndService.getCategories();// $firebaseArray(categoriesRef);

	$scope.headerInput;
	$scope.textInput;
	$scope.pictureInput;
	$scope.authorInput;
	$scope.categoryInput;
	$scope.addCatFormVisible = false;
	$scope.validationChecked = false;

	var article = {};
	console.log($routeParams.articleId);
	if ($routeParams.articleId) {

		var articles = backEndService.makeList();

		articles.$loaded().then(function() {
			for(var i in articles){
				if(articles[i].$id == $routeParams.articleId){
					article = articles[i];
				};
			}; 

			//get values from object
			$scope.headerInput = article.title;
			$scope.textInput = article.text.replace(/<br>/g, '\n');
			$scope.pictureInput = article.img;
			$scope.authorInput = article.author;
			for (var i = $scope.categories.length - 1; i >= 0; i--) {
				if ($scope.categories[i].$value === article.category) {
					$scope.selectedCat = $scope.categories[i];
				};
			};
		});
	}

	$scope.showAddCatForm = function() {
		$scope.addCatFormVisible = true;
	}

	$scope.addCategory = function() {
		backEndService.addCategory($scope.newCatInput);
		$scope.addCatFormVisible = false;
	}

	$scope.removeCat = function() {
		if (backEndService.isCatUsed($scope.selectedCat.$value)) {
			alert("Det gick inte att ta bort kategorin! Du måste ta bort artiklar med kategorin först.");
		} else if (confirm("Är du säker på att du vill ta bort den här kategorin?")) {
			backEndService.removeCategory($scope.selectedCat);
		}
	}

	$scope.validateAndSub = function(event) {
		if ($scope.editArticleForm.$valid) {

			if ($routeParams.edit) {
				// finish editing of object
				article.title = $scope.headerInput;
				article.text = $scope.textInput.replace(/\r?\n/g, '<br>');
				article.author = $scope.authorInput;
				article.category = $scope.selectedCat.$value;
				if ($scope.pictureInput) {
					article.img = $scope.pictureInput; 
				}

				backEndService.saveArticle(article);
			} else {
				var newArticle = {
					title: $scope.headerInput, 
					text: $scope.textInput.replace(/\r?\n/g, '<br>'),
					author: $scope.authorInput, 
					date : new Date().getTime(),
					category: $scope.selectedCat.$value
				};


				if ($scope.pictureInput) {
					newArticle.img = $scope.pictureInput; 
				}
				// pushes new object to firebase trough backEndService
				backEndService.addArticle(newArticle);
			}

			// clears $scope-properties
			$scope.headerInput = "";
			$scope.textInput = "";
			$scope.pictureInput = "";
			$scope.authorInput = "";

			history.back();
			// $location.path('/'); // go home after submit.
		} else {
			event.preventDefault();
			$scope.validationChecked = true;
		};
	}
}]);