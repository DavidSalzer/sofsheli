comedyApp.controller('comedyCtrl', ['$rootScope', '$stateParams', '$scope', '$state', '$timeout', '$http', 'generalDetails', '$analytics', function ($rootScope, $stateParams, $scope, $state, $timeout, $http, generalDetails, $analytics) {

    //if (IEversion !== false) {
    //    $('.scratch_title, #scratchcard, .facebook, .download').css('display', 'none');
    //    $('#buttons').css('display', 'block');
    //} else {
    //    $('.note_ie, .scratch_title_ie').css('display', 'none');
    //}
    $scope.domain = 'http://sofsheli.kidstv.co.il/'
    $scope.imgPath = generalDetails.getPathUrl();

    $scope.shareText = generalDetails.getShareText();

    $scope.excuseIE = generalDetails.getTextIe();

    $scope.facebookUrl = 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent('http://sofsheli.kidstv.co.il/share.php?img=' + $scope.imgPath);

    //Angularytics
    $scope.analyticsObj = generalDetails.getAnalytics();

    $analytics.eventTrack('PageView', { category: 'Sofshely', label: 'ComedyPage - ' + JSON.stringify($scope.analyticsObj) });

    $scope.whatsappShare = function () {
        $scope.whatsappUrl = 'whatsapp://send?text=זה הסטנדאפ שאני הולך להופיע איתו היום בערב! - ' + $scope.shareText + '  רוצים גם? היכנסו למכונת הסטנדאפ וצרו אחד משלכם: ' + $scope.domain //+ 'share.php?img=' + $scope.imgPath;
        window.location.href = $scope.whatsappUrl;
        $analytics.eventTrack('ClickShare', { category: 'Sofshely', label: 'Whatsapp - ' + JSON.stringify($scope.analyticsObj) });
    }

    $scope.mailShare = function () {
        $scope.mailUrl = 'mailto:?subject=זה הסטנדאפ שאני הולך להופיע איתו היום בערב!&body=' + $scope.shareText + ' רוצים גם? היכנסו למכונת הסטנדאפ וצרו אחד משלכם: http://sofsheli.kidstv.co.il/';
        window.location.href = $scope.mailUrl;
        $analytics.eventTrack('ClickShare', { category: 'Sofshely', label: 'Mail - ' + JSON.stringify($scope.analyticsObj) });
    }

    $scope.facebookShare = function () {
        window.open($scope.facebookUrl, '_blank');
        $analytics.eventTrack('ClickShare', { category: 'Sofshely', label: 'Facebook - ' + JSON.stringify($scope.analyticsObj) });
    }

    $scope.download = function () {
        $('a.download_link').attr('href', './' + $scope.imgPath);
        $analytics.eventTrack('ClickShare', { category: 'Sofshely', label: 'Download - ' + JSON.stringify($scope.analyticsObj) });
    }

    $scope.Android = navigator.userAgent.match(/Android/i);
    $scope.BlackBerry = navigator.userAgent.match(/BlackBerry/i);
    $scope.iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    $scope.Opera = navigator.userAgent.match(/Opera Mini/i);
    $scope.Windows = navigator.userAgent.match(/IEMobile/i);

    if ($scope.Android || $scope.BlackBerry || $scope.iOS || $scope.Opera || $scope.Windows) {
        $('.whatsapp').css('display', 'block')
    } else {
        $('.whatsapp').css('display', 'none')

        //scope.mobile = false;
    }


    $scope.backToMain = function () {
        $state.transitionTo('main');
    }


    var excuse = generalDetails.getPathUrl();
    var buttons;

    createScratchCard({
        "container": document.getElementById("scratchcard"),
        "background": excuse,
        "foreground": "./images/scratch.png",
        "percent": 60,
        "coin": "./images/coin2.png",
        "thickness": 50,
        "counter": "percent",
        "callback": "endScratch"
    });

} ])


function endScratch() {
    $('#buttons').css('display', 'block');
    $('.scratch_title').css('display', 'none');
    $('.excuse_title').css('display', 'block');
    $('.tape').css('display', 'block');
}