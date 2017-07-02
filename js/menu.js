
app.controller('NavCtrl', ["$scope", '$firebaseArray', '$firebaseObject', "$routeParams", "$location", 'backEndService', 'searchValue','admin', function($scope, $firebaseArray, $firebaseObject, $routeParams, $location, backEndService, searchValue,admin){

	$scope.test = true;
	backEndService.checkUser();
/*	var categoriesRef =  new Firebase('https://grupp4news.firebaseio.com/categories');
	$scope.categories = $firebaseArray(categoriesRef);*/
	$scope.categories = backEndService.getCategories();
	$scope.currentUser = backEndService.getUser();
	//$scope.categories = backEndService.makeList();

	$scope.isActive = function(viewLocation) { 
        return viewLocation === $location.path();
    };

	$scope.LogInClicked = function(event) {

		if ($scope.loginInfo.$valid) {

			backEndService.loginUser($scope.userInfo, $scope.passwordInfo).then(function(data) {

				$scope.currentUser = data.password.email;
				backEndService.checkUser();
				$scope.userInfo = "";
				$scope.passwordInfo = "";

			}).catch(function(data) {
				var message = "Varning! Användarnamnet och/eller lösenordet är ogiltigt.";
				alert(message);
			});


		} else {
			event.preventDefault();
			console.log("No content in one or more of the required input-boxes");
			var message = "Varning! Användarnamn och lösenord krävs.";
			alert(message);
		};
		//$scope.$parent.$parent.showAdminUI = true;
	};

	$scope.LogOutClicked = function() {
		//$scope.$parent.$parent.showAdminUI = false;
		//$scope.$parent.showAdminUI = true;

		console.log("Logging out");
		backEndService.logOutUser();
		$location.path('/');

		/*if (backEndService.checkUser().$getAuth) {
			
			console.log($location.path());

			//if ($location.path() === '/editArticle') {
			//};
		}*/
	};

	$scope.getFilter = function(category){
		$location.path("/list/" + category);
	};

	$scope.searchText = function(event) {
		searchValue.text = $scope.searchString;
		$scope.searchString = "";
		console.log($scope.searchString);
		$location.path('/list');
	}

	$scope.home = function() {
		searchValue.text = "";
	}

	$scope.userMenuClicked = function() {
		$scope.userMenuVisible = !$scope.userMenuVisible;
	}
}]);
