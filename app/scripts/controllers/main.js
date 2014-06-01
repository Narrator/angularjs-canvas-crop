'use strict';

angular.module('giftcardsCropApp')
  .controller('MainCtrl', function ($scope) {
    $scope.uploaded = false;
    $scope.uploadSrc = '';

    // Allows a directive to set the uploaded bool
    $scope.setUpload = function(src) {
      $scope.uploaded = true;
      $scope.uploadSrc = src;

      // Force a digest cycle to run on the scope
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    };
  });