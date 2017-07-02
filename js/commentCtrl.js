
app.controller("commentCtrl", ["$scope", '$firebaseArray',  "$routeParams", "backEndService", '$sce', function($scope, $firebaseArray, $routeParams, backEndService, $sce){
	
	/*var articles = backEndService.makeList();
	articles.$loaded().then(function(){

			for(var i in articles){
				if($routeParams.articleId == articles[i].$id){
					$scope.article = articles[i];
				};
			};*/

		//$scope.comments = $scope.article.comments;

		//console.log($scope.article);

		/*var ref = new Firebase('https://grupp4news.firebaseio.com/articles/').child($routeParams.articleId).child("comments");
		$scope.comments = $firebaseArray(ref);*/
	
		//console.log($firebaseArray($ref(backEndService.makeList()).child($routeParams.articleId).child("comments")));
		$scope.comments = backEndService.getComments($routeParams.articleId);
	//});
/*	scope.commentsHTML = function(text){
		return $sce.trustAsHtml("hej");
	};*/

	
	$scope.addComment = function(event){

		if($scope.commentForm.$valid){

			var commentObject = {
				text: $scope.newComment.replace(/\r?\n/g, '<br>'),
				name: $scope.newName
			};

			$scope.comments.$add(commentObject);
			$scope.newComment = "";
			$scope.newName = "";

		} else {
			event.preventDefault();
		};
	};

	$scope.deleteComment = function(comment){
		if (confirm("Do you want to remove this comment?")) {
			$scope.comments.$remove(comment);
			return;
		}else {
			return;
		}
	};

}]);
