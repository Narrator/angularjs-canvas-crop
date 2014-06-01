'use strict';

angular.module('giftcardsCropApp')
  .directive('imageUpload', function () {
    var fileReader = new FileReader();

    return {
      templateUrl: 'views/partials/file-upload.html',
      restrict: 'A',
      scope: {
        uploaded: '&onUpload'
      },
      link: function (scope, elem) {
        var previousImage = angular.element(document).find('#full-user-image').attr('src');
        if (typeof(previousImage) !== 'undefined') {
          scope.uploaded({src: previousImage});
        }

        elem.find('.img-upload-upload-link').bind('click', function () {
          var fileInput = elem.find('input[type="file"]');
          fileInput.show();
          fileInput.focus();
          fileInput.click();
          fileInput.hide();
        });

        elem.find('.img-upload-file-input').on('change', function (evt) {
          var file = evt.target.files[0];

          if (file.size < 1) {
            console.log('Whoa there! No image found');
            return false;
          }

          fileReader.onloadend = function (e) {
            var img = new Image();
            img.id = 'pic';
            img.onload = function () {
              var mpImg = new MegaPixImage(img);
              var sourceImage = document.createElement('img');
              sourceImage.id = 'full-user-image';
              sourceImage.style.display = 'none';
              angular.element('body').append(sourceImage);
              mpImg.render(sourceImage, { maxWidth: 2100, maxHeight: 1344, orientation: scope.rotateAngle });
              scope.uploaded({src: sourceImage.src});
            };

            img.src = e.target.result;
          };

          fileReader.readAsDataURL(file);

        });

        /*
         Not used, but shows how if the image uploaded is less than
         the minimum it would create an image to that size placing
         the original image in the center of the image
         */
        scope.createScaledImage = function (image) {
          // Scale the image
          var canvas = document.createElement('canvas');
          canvas.width = (image.width > scope.minSize) ? image.width : scope.minSize;
          canvas.height = (image.height > scope.minSize) ? image.height : scope.minSize;

          var ctx = canvas.getContext('2d');
          ctx.fillStyle = "rgb(255,255,255)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, (canvas.width / 2 - image.width / 2), (canvas.height / 2 - image.height / 2));

          return canvas.toDataURL();
        };
      }
    };
  });
