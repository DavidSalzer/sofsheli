torScoreApp.controller('info', ['$rootScope', '$scope', '$state', '$http','userService', function ($rootScope, $scope, $state, $http,userService) {
    userService.isLogin().then(function(login){
		if (!login)
			$state.transitionTo('login');
	})
	$http({method: 'POST', url: '../server/data.php?type=getInfo'}).
	success(function(data, status, headers, config) {
		$scope.info	=data;
		$scope.selectCategories	=$scope.info.categories[0];
		console.log(data);
	});
	$scope.save=function(){
		$http({method: 'POST', url: '../server/data.php?type=setInfo', data:{data:$scope.info}}).
		success(function(data, status, headers, config) {
			alert("המידע נשמר")
		});
	}
	
	$scope.addCategory=function(){
		var i=$scope.info.categories.length;
		$scope.info.categories[i]= {categoryName: "חדש",id: i+1,templates: []};
		$scope.selectCategories	=$scope.info.categories[i];
	}
	
	$scope.deleteCategory=function(){
		$scope.info.categories.splice($scope.selectCategories.id-1, 1);
		var j=0;
		var newCategories=[];
		for(var i=0;i<$scope.info.categories.length;i++){
			if ($scope.info.categories[i]!=null){
				newCategories[j]=$scope.info.categories[i];
				newCategories[j].id=j+1;
				j++;
			}
		}
		$scope.info.categories=newCategories;
		$scope.selectCategories	=$scope.info.categories[0];
		console.log($scope.info);		
	}
	
	$scope.addTemplate=function(){
		var i=$scope.selectCategories.templates.length;
		$scope.selectCategories.templates[i]= {templateId:i+1,questions:[],excuse:{ending:"",headline:"",paragraph1:"",paragraph2:"",paragraph3:""}};
	}

	$scope.deleteTemplate=function(template){
		$scope.selectCategories.templates.splice(template.templateId-1, 1);
		var j=0;
		var newTemplates=[];
		for(var i=0;i<$scope.selectCategories.templates.length;i++){
			if ($scope.selectCategories.templates[i]!=null){
				newTemplates[j]=$scope.selectCategories.templates[i];
				newTemplates[j].templateId=j+1;
				j++;
			}
		}
		$scope.selectCategories.templates=newTemplates;
	}

	$scope.addQuestion=function(questions){
		var i=questions.length;
		questions[i]= {questionId:i+1,question:""};
	}

	$scope.deleteQuestion=function(template,question){
		template.questions.splice(question.questionId-1, 1);
		var j=0;
		var newQuestions=[];
		for(var i=0;i<template.questions.length;i++){
			if (template.questions[i]!=null){
				newQuestions[j]=template.questions[i];
				newQuestions[j].questionId=j+1;
				j++;
			}
		}
		template.questions=newQuestions;
	}
	
} ]);