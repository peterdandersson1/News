
app.controller('ArticleViewCtrl', ['$scope', '$routeParams', 'backEndService','$location', '$firebaseArray', '$route', '$sce', 'changeTop', function($scope, $routeParams, backEndService, $location, $firebaseArray, $route, $sce, changeTop) {

	backEndService.checkUser();
	changeTop.top(false);
	scroll(0,0);
	var articles = backEndService.makeList();
	articles.$loaded().then(function(){
	for(var i in articles){
		if(articles[i].$id === $routeParams.articleId){
			$scope.article = articles[i];
			$scope.articleHTML = $sce.trustAsHtml(articles[i].text);
		};
	};
	});

	// Removes article from inside article-view.
	$scope.remove = function(id){
		if (confirm("Do you want to remove this article?")) {
			backEndService.removeArticle(id);
			$location.path("/resultList");
		}
	};

	// Edits article from inside article-view.
	$scope.edit = function(id){
		$location.path("/editArticle/" + id + "/" + true);
	};
}]);

