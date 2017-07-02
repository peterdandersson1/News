
//var articles = [];
var app = angular.module('App', ['firebase', 'ngRoute', 'ngSanitize']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/article/:articleId', {
		templateUrl: "readArticle.html"
	});

	$routeProvider.when('/editArticle/:articleId', {
		templateUrl: "editArticle.html"
	});

	$routeProvider.when('/editArticle/:articleId/:edit', {
		templateUrl: "editArticle.html"
	});

	$routeProvider.when('/editArticle', {
		templateUrl: "editArticle.html"
	});

	$routeProvider.when('/list', {
		templateUrl: "list.html"
	});
		
	$routeProvider.when('/list/:category', {
		templateUrl: "list.html"
	});

	$routeProvider.otherwise({
		redirectTo: "/list"
	});
}]);

app.controller('MainCtrl', ['$scope', 'admin',  function($scope, admin){
	//var ref = new Firebase('https://grupp4news.firebaseio.com/articles');
	// var obj = $firebaseObject(ref);
	// obj.$remove();
	//articles = $firebaseArray(ref);
	//articles.$loaded().then(function(){
	//	console.log(articles[0].$id);
	//});
	// PUSH Articles
	// angular.forEach(articles, function(article) {
	// 	list.$add(article);
	// });
	
	//$scope.showAdminUI = false;
	//$scope.showAdminUI = backEndService.checkUser().$getAuth();

	$scope.changeUser = function(){
		
		return admin.show;
	};
}]);

app.controller('ContentCtrl', ['$scope', function($scope){


}]);

/*app.service('removeService', function(){
	var removeArticle = function(id){
		for (var i in articles){
			if (id === articles[i].$id) {
				articles.$remove(articles[i]);
				return;
			};
		}
	}
	return {removeArticle:removeArticle}
});*/

