var comedyApp = angular.module('comedyApp', ['ui.router', 'ui.bootstrap', 'uiRouterStyles','angulartics', 'angulartics.google.analytics'])

/**** UI Router ****/
comedyApp.config(['$stateProvider', '$urlRouterProvider', '$compileProvider','$analyticsProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $compileProvider, $analyticsProvider, $locationProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp|https?|ftp|mailto|chrome-extension):/);
    //$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/main");

    $stateProvider
    .state('main', {
        url: '/main',
        controller: 'mainCtrl',
        templateUrl: './components/main/main.html',
        data: {
            css: ['./css/style.css']
        }
    })

    .state('category', {
        url: '/category/:postId',
        controller: 'categoryCtrl',
        templateUrl: './components/category/category.html',
        data: {
            css: ['./css/style.css']
        }
    })


    .state('comedy', {
        url: '/comedy',
        controller: 'comedyCtrl',
        templateUrl: './components/comedy/comedy.html',
        data: {
            css: ['./css/style.css']
        }
    })


} ]);


//comedyApp.run(function (Angularytics) {
//    Angularytics.init();
//});

comedyApp.filter('trustHtml', ['$sce', function ($sce) {
    return function (val) {
        if (val != null) {
            return $sce.trustAsHtml(val.toString());
        }
    };
} ])

comedyApp.filter('encodeURIComponent', function () {
    return window.encodeURIComponent;
});

