'use strict';

angular.module('giftcardsCropApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/crop', {
        templateUrl: 'partials/cropimage',
        controller: 'CropimageCtrl'
      })
      .when('/finish', {
        templateUrl: 'partials/finish',
        controller: 'FinishCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });