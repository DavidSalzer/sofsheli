comedyApp.controller('mainCtrl', ['$rootScope', '$stateParams', '$scope', '$state', '$timeout', '$http', '$analytics', function ($rootScope, $stateParams, $scope, $state, $timeout, $http, $analytics) {
    //Angularytics
    //Angularytics.trackEvent("Elisha","PageView", "CategoryPage");


    $analytics.eventTrack('PageView', { category: 'Sofshely', label: 'Main Page' });

    //Get data
    $http.get('server/data.php?type=getInfo').success(function (data) {
        $scope.main = data;
        console.log($scope.main);
        $scope.goToCategory = function (str) {
            $state.transitionTo('category', { postId: str });
        }
    });




} ])

