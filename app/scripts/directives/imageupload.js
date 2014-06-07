/*global MegaPixImage:false */
/*global EXIF:false */
'use strict';

angular.module('giftcardsCropApp')
  .directive('imageUpload', function () {
    var fileReader = new FileReader();

    return {
      templateUrl: 'views/partials/imageupload.html',
      restrict: 'A',
      scope: {
        uploaded: '&onUpload'
      },
      link: function (scope, elem) {
        // What's the minimum size we want?
        scope.minSize = 400;

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

          // Set the rotation
          scope.getFileOrientation(evt.target.files);
          scope.getAllMetaData(evt.target.files);

          if (file.size < 1) {
            console.log('Whoa there! No image found');
            return false;
          }

          fileReader.onloadend = function (e) {
            console.log(scope.exifData);

            var img = new Image();
            img.id = 'pic';
            img.onload = function () {
              angular.element('#full-user-image').remove();
              var mpImg = new MegaPixImage(img);
              var sourceImage = document.createElement('img');
              sourceImage.id = 'full-user-image';
              sourceImage.style.display = 'none';
              angular.element('body').append(sourceImage);

              if((img.width < scope.minSize) || (img.height < scope.minSize)) {
                sourceImage.src = scope.createScaledImage(img);
              } else {
                mpImg.render(sourceImage,{ maxWidth: 2100, maxHeight: 1344, orientation: scope.rotateAngle });
              }

              scope.uploaded({src: sourceImage.src});
            };

            img.src = e.target.result;
          };

          fileReader.readAsDataURL(file);

        });

        /*
         Take the user's image and determine if it needs to be scaled up
         */
        scope.createScaledImage = function (image) {
          // Scale the image
          var canvas = document.createElement('canvas');
          canvas.width = (image.width > scope.minSize) ? image.width : scope.minSize;
          canvas.height = (image.height > scope.minSize) ? image.height : scope.minSize;

          var ctx = canvas.getContext('2d');
          ctx.fillStyle = 'rgb(255,255,255)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, (canvas.width / 2 - image.width / 2), (canvas.height / 2 - image.height / 2));

          return canvas.toDataURL();
        };

        scope.getAllMetaData = function(files) {
          EXIF.getData(files[0], function() {
            scope.exifData = EXIF.pretty(this);
          });
        };

        scope.getFileOrientation = function (files) {
          EXIF.getData(files[0], function () {
            var orientation = EXIF.getTag(this, 'Orientation');
            if (typeof(orientation) !== 'undefined') {
              scope.rotateAngle = orientation;
            }
          });
        };
      }
    };
  });
