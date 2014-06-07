'use strict';

angular.module('giftcardsCropApp')
  .controller('FinishCtrl', function ($scope, $location) {
    /*
      Get the cropped image created in the previous route
      If it's not available redirect them to the Upload page
     */
    var source = angular.element('#crop-image-1').get(0);
    if(typeof(source) !== 'undefined') {
      console.log(source.src);
      $scope.imgSrc = source.src;
    } else {
      // Redirect them back to the upload
      $location.path('/');
    }
  }
);