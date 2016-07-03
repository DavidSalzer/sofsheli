torScoreApp.directive('header', ['$state', '$rootScope','userService', function ($state, $rootScope,userService) {
    return {
        restrict: 'E',
        templateUrl: './directives/header/header.html',
		link: function (scope, el, attrs) {
           scope.logout = function(){
			   userService.logout();
           }

        },
        replace: true
    };
	


} ]);

