'use strict';

angular.module('giftcardsCropApp')
  .controller('FinishCtrl', function ($scope) {
    $scope.imgSrc = angular.element('#crop-image-1').get(0).src;
  }
);