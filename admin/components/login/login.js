torScoreApp.controller('login', ['$rootScope', '$scope', '$state', '$http', 'userService', function ($rootScope, $scope, $state,$http,userService) {
    $scope.error_password=false;
	userService.isLogin().then(function(login){
		if (login)
			$state.transitionTo('info');
	})
	$scope.login = function () {
		
		$http({method: 'POST', url: '../server/data.php?type=login', data:{pass: $scope.pass}}).
			success(function(data, status, headers, config) {
				if (data=="true") {
					
					userService.login();
					$state.transitionTo('info');
				}
				else $scope.error_password=true;
			}).
			error(function(data, status, headers, config) {
				alert("error");
			});
    }
} ]);