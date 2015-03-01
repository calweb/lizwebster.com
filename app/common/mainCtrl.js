(function () {
  "use strict";
  angular.module("lizwebster")
    .controller("MainCtrl", function ($timeout, photoService) {
      var main = this;
      // main.myMom = [];
      photoService.getPhotos().then(function (photos) {
        main.myMom = photos.data.photoset.photo;
        console.log(main.myMom);

      });

      main.notFound = "We're sorry, but the page you requested is not found."

      var INTERVAL = 6000;

   function setCurrentSlideIndex(index) {
       main.currentIndex = index;
   }

   function isCurrentSlideIndex(index) {
       return main.currentIndex === index;
   }

   function nextSlide() {
       main.currentIndex = (main.currentIndex < main.myMom.length - 1) ? ++main.currentIndex : 0;
       $timeout(nextSlide, INTERVAL);
   }


   function setCurrentAnimation(animation) {
       main.currentAnimation = animation;
   }

   function isCurrentAnimation(animation) {
       return main.currentAnimation === animation;
   }

   $timeout(nextSlide, INTERVAL);

   main.progress = 0;
   main.loaded = true;
   main.currentIndex = 1;
   main.currentAnimation = 'fade-in';

   main.setCurrentSlideIndex = setCurrentSlideIndex;
   main.isCurrentSlideIndex = isCurrentSlideIndex;
   main.setCurrentAnimation = setCurrentAnimation;
   main.isCurrentAnimation = isCurrentAnimation;


  })
  .animation('.fade-in', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { opacity: 0}, {opacity: 1, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {opacity: 0, onComplete: done});
        }
    };
  })
  .directive('bgImage', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
        var resizeBG = function () {
            var bgwidth = element.width();
            var bgheight = element.height();

            var winwidth = $window.innerWidth;
            var winheight = $window.innerHeight;

            var widthratio = winwidth / bgwidth;
            var heightratio = winheight / bgheight;

            var widthdiff = heightratio * bgwidth;
            var heightdiff = widthratio * bgheight;

            if (heightdiff > winheight) {
                element.css({
                    width: winwidth + 'px',
                    height: heightdiff + 'px'
                });
            } else {
                element.css({
                    width: widthdiff + 'px',
                    height: winheight + 'px'
                });
            }
        };

        var windowElement = angular.element($window);
        windowElement.resize(resizeBG);

        element.bind('load', function () {
            resizeBG();
        });
      }
    }
  });
  
})();
