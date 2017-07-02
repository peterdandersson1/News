//services used in program

app.factory('categoriesConnect', ['$firebaseArray', function($firebaseArray){
		var categoriesRef =  new Firebase('https://grupp4news.firebaseio.com/categories');
		return $firebaseArray(categoriesRef);

}]);

app.factory('commentsConnect', ['$firebaseArray', function($firebaseArray){
	var connect = function(id){
		var ref = new Firebase('https://grupp4news.firebaseio.com/articles/').child(id).child("comments");
		return $firebaseArray(ref);
	}
	return {connect:connect};	
	
}]);

//establish connection to firebase for articles
app.factory('articleConnect', ['$firebaseArray',
  		function($firebaseArray) {
    	// create a reference to the Firebase where we will store our data
    	
    	var ref = new Firebase("https://grupp4news.firebaseio.com/articles");

    	return $firebaseArray(ref);
 }]);

app.factory('usersConnect', ['$firebaseAuth',
	function($firebaseAuth) {
		var ref = new Firebase("https://grupp4news.firebaseio.com");

		return $firebaseAuth(ref);
	}]);

//service with methods to handle articles avaliable for access troughout the program

app.service('backEndService',['articleConnect', 'categoriesConnect', 'commentsConnect', 'usersConnect', 'admin', function(articleConnect, categoriesConnect, commentsConnect, usersConnect,admin){
	var removeArticle = function(article){
		articleConnect.$remove(article);
	};
	var addArticle = function(article){
		articleConnect.$add(article);
	};
	var saveArticle = function(article){
		articleConnect.$save(article);
	};
	var makeList = function(){
		return articleConnect;
	};
	var getComments = function(id){
		return commentsConnect.connect(id);
	};
	var getCategories = function(){
		return categoriesConnect;
	};
	var addCategory = function(category){
		categoriesConnect.$add(category);
	};
	var removeCategory = function(category) {
		categoriesConnect.$remove(category);
	}

	var checkUser = function() {
		var authData = usersConnect.$getAuth();
		if(authData){
			admin.show = true;
			console.log("körsss");
		};
	};
	var getUser = function() {
		var authData = usersConnect.$getAuth();
		if (authData) {
			console.log("i servicecode: "+authData.uid);
			return authData.password.email;
		}
	};
	var loginUser = function(user, password) {
		return usersConnect.$authWithPassword({
			email: user,
			password: password
		});
	};
	var logOutUser = function(){
		usersConnect.$unauth();
		admin.show = false;
	};
	var isCatUsed = function(category) {
		var isUsed = false;
		for (var i = articleConnect.length - 1; i >= 0; i--) {
			if (articleConnect[i].category == category) {
				isUsed = true;
			};
		};
		return isUsed;
	};

	return {removeArticle:removeArticle,
			addArticle:addArticle,
			makeList:makeList,
			saveArticle:saveArticle,
			getComments:getComments,
			getCategories:getCategories,
			addCategory:addCategory,
			removeCategory:removeCategory,
			checkUser:checkUser,
			loginUser:loginUser,
			getUser:getUser,
			isCatUsed:isCatUsed,
			logOutUser:logOutUser
	};
}]);

app.value('searchValue', {'text': ""});
app.value('admin', {'show':false});
app.factory('changeTop', [ function() {
	var top = function(top){
		if(top){
			$("body").addClass("body-top");
			$(".navbar").addClass("navbar-fixed-top")
		} else {
			$("body").removeClass("body-top");
			$(".navbar").removeClass("navbar-fixed-top")
		};
	};
	return {top:top};
		
	}]);


