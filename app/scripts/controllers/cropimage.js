'use strict';

angular.module('giftcardsCropApp')
  .controller('CropimageCtrl', function ($scope, $location) {
    // Handle if there's no image found to crop
    $scope.imageError = function() {
      $location.path('/');
    };

    $scope.imageFinish = function() {
      // Take the image from the existing canvas
      // then send it to the "server"
      var img = new Image();
      img.id = 'crop-image-1';
      img.src = angular.element('#exportCanvas').get(0).toDataURL('image/jpeg');
      img.style.display = 'none';
      angular.element('body').append(img);

      // Forward them to the end
      $location.path('/finish');
    };
  });
