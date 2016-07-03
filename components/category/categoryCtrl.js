comedyApp.controller('categoryCtrl', ['$rootScope', '$stateParams', '$scope', '$state', '$timeout', '$http', 'generalDetails', '$analytics', function ($rootScope, $stateParams, $scope, $state, $timeout, $http, generalDetails, $analytics) {
    //go back
    $scope.goBack = function () {
        $state.transitionTo('main');
    }

    //Get data
    $http.get('server/data.php?type=getInfo').success(function (data) {
        $scope.main = data;

        for (var i in $scope.main.categories) {
            if ($scope.main.categories[i].categoryName == $stateParams.postId) {
                $scope.category = $scope.main.categories[i];
            }
        }

        //show random template
        $scope.randomTemplate = $scope.category.templates[Math.floor(Math.random() * $scope.category.templates.length)];


        $analytics.eventTrack('PageView', { category: 'Sofshely', label: 'QuestionsPage - ' + JSON.stringify({ categoryId: $scope.category.id, TemplateName: $scope.randomTemplate.templateName }) });

        generalDetails.setAnalytics($scope.category.id, $scope.randomTemplate.templateName);

        //replace missing word
        $scope.replaceWords = function (str) {
            var by = $scope.randomTemplate.questions;
            for (var i = 0; i < by.length; i++) {
                var find = "word" + (i + 1);
                var re = new RegExp(find, 'g');
                str = str.replace(re, by[i].answer);
            }
            return str;
        }

        //create excuse and canvas
        $scope.saveAns = function (isValid) {
            if (isValid) {

                //$('#excusehModal').modal('show');
                $scope.headline = $scope.replaceWords($scope.randomTemplate.excuse.headline);
                $scope.paragraph1 = $scope.replaceWords($scope.randomTemplate.excuse.paragraph1);
                $scope.paragraph2 = $scope.replaceWords($scope.randomTemplate.excuse.paragraph2);
                $scope.paragraph3 = $scope.replaceWords($scope.randomTemplate.excuse.paragraph3);
                $scope.ending = $scope.replaceWords($scope.randomTemplate.excuse.ending);

                $scope.textToShare = $scope.headline + $scope.paragraph1 + $scope.paragraph2 + $scope.paragraph3 + $scope.ending;
                generalDetails.setShareText($scope.textToShare);


                //$scope.excuse = "<div class=\"note\"><p>" + $scope.headline +
                //        "</p><p>" + $scope.paragraph1 +
                //        "</p><p>" + $scope.paragraph2 +
                //        "</p><p>" + $scope.paragraph3 +
                //        "</p><p>" + $scope.ending +
                //        "</p></div>";

                //generalDetails.getNoteUrl($scope.excuse);

                $.ajax({
                    type: "POST",
                    url: "server/data.php?type=getimageText",
                    data: JSON.stringify({ "text": [$scope.headline, $scope.paragraph1, $scope.paragraph2, $scope.paragraph3, $scope.ending] }),
                    success: function success(data) {
                        //$scope.flag = true;
                        generalDetails.setPathUrl(data.path);
                        //$('#excusehModal').on('hidden.bs.modal', function (e) {
                        $state.transitionTo('comedy');
                        //});
                        //$('#excusehModal').modal('hide');
                    },
                    error: function error(data) {
                        console.log("error");
                    }

                });

                //$timeout(function () {
                //    var canvas = document.getElementById("canvas");
                //    context = canvas.getContext('2d');
                //    html_container = document.getElementById("note");
                //    html = html_container.innerHTML;

                //    rasterizeHTML.drawHTML(html).then(function (renderResult) {
                //        context.drawImage(renderResult.image, 0, 0, 750, 589);
                //        var t = canvas.toDataURL("image/png");
                //        generalDetails.setNoteUrl(t);
                //    });
                //    $('#excusehModal').modal('show');

                //}, 0);

            }
            else {
                $('.error_message').css('display', 'block');
            }


            $scope.submitted = true;
        };


        //$scope.getClasss = function (index) {
        //    var num = index % 4;
        //    switch (num) {
        //        case 0:
        //            return 'orange-title';
        //            break;
        //        case 1:
        //            return 'blue-title';
        //            break;
        //        case 2:
        //            return 'brown-title';
        //            break;
        //        case 3:
        //            return 'red-title';
        //            break;
        //    }
        //}



    });

} ])

