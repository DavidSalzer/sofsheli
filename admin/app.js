var torScoreApp = angular.module('torScoreApp', ['ui.router'])

torScoreApp.service('userService',['$http','$q', '$state', function($http,$q,$state){
	
	var loginStatus =null;
    this.isLogin = function(){
		if (loginStatus==null){
			return $http({method: 'POST', url: '../server/data.php?type=isLogin'}).
			then(function(data) {
				loginStatus=(data.data=="true");	
				return loginStatus;
			});
		}
		else {
			var defer = $q.defer();
			defer.resolve( loginStatus );
			return( defer.promise );
		}
	};
	this.login = function(){
		loginStatus=true;
	};
	this.logout = function(){
		$http({method: 'POST', url: '../server/data.php?type=logout'}).
		success(function(data, status, headers, config) {
			loginStatus	=false;
			$state.transitionTo('login');
		});
	}
}]);

/**** UI Router ****/
torScoreApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/info");

    $stateProvider
		.state("login", {
		    url: "/login",
		    views: {
		        "main": {
		            templateUrl: "components/login/login.html",
		            controller: "login"
		        }
		    }
		})
        .state("info", {
            url: "/info",
            views: {
                "main": {
                    templateUrl: "components/info/info.html",
                    controller: "info"
                }
            }
        })

        
        
        
});
