angular.module('vedioPrize', ['ngRoute']).controller('defaultController', function ($scope, $route) { $scope.$route = $route;})
	.controller('vedioController', function ($scope, $route) { $scope.$route = $route;})
	.config(function ($routeProvider) {
	    $routeProvider.
	    when('/reward', {
	        templateUrl: 'pages/reward.html',
	        controller: 'defaultController'
	    }).
	    when('/vedio', {
	        templateUrl: 'pages/vedio.html',
	        controller: 'vedioController'
	    }).
	    otherwise({
	        redirectTo: '/reward'
	    });
	}).controller('myCtrl', function($scope) {
		$scope.s_way="public/emotions/default/";
	    $scope.pics = ["88_thumb","angrya_thumb","bba_thumb","bs_thumb","bs2_thumb","bz_thumb","cj_thumb","cool_thumb","crazya_thumb","cry","cza_thumb","dizzya_thumb","geili_thumb","good_thumb","gza_thumb","h_thumb","hatea_thumb","hearta_thumb","heia_thumb","hsa_thumb","k_thumb","kbsa_thumb","kl_thumb","laugh","ldln_thumb","lovea_thumb","mb_thumb","money_thumb","nm_thumb","ok_thumb","qq_thumb","sada_thumb","sb_thumb","shamea_thumb","sk_thumb","sleepa_thumb","sleepya_thumb","smilea_thumb","sw_thumb","sweata_thumb"];
	    $scope.s_behead=".gif";
	    $scope.text_content="请输入文字";
	});
