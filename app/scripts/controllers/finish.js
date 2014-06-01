'use strict';

angular.module('giftcardsCropApp')
  .controller('FinishCtrl', function ($scope, $location) {
    var source = angular.element('#crop-image-1').get(0);
    if(typeof(source) !== 'undefined') {
      $scope.imgSrc = source.src;
    } else {
      // Redirect them back to the upload
      $location.path('/');
    }
  }
);