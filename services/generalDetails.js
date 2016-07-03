comedyApp.factory('generalDetails', ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {

    var noteUrl;
    var pathUrl;
    var shareText;
    var textIe;
    var analyticsObj = {};


    return {

        setNoteUrl: function (url) {
            noteUrl = url;
            $rootScope.$broadcast('scratch');
        },

        getNoteUrl: function () {
            return noteUrl;
        },

        setPathUrl: function (path) {
            pathUrl = path;
            $rootScope.$broadcast('scratch');
        },

        getPathUrl: function () {
            return pathUrl;
        },

        setShareText: function (text) {
            shareText = text;
            //$rootScope.$broadcast('scratch');
        },

        getShareText: function () {
            return shareText;
        },

        setAnalytics: function (categoryId, templateName) {
            analyticsObj.categoryId = categoryId;
            analyticsObj.templateName = templateName;
            //$rootScope.$broadcast('scratch');
        },

        getAnalytics: function () {
            return analyticsObj;
        },

        setTextIe: function (text) {
            textIe = text;
            //$rootScope.$broadcast('scratch');
        },

        getTextIe: function () {
            return textIe;
        }


    }
} ])