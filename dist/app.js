(function(app) {

    app.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: "common/views/main.html",
          controller: "MainCtrl as main"
        })
        .when('/stories', {
          templateUrl: "common/views/stories.html"
        })
        .when('/not-found', {
          templateUrl: "common/views/not-found.html"
        })
        .otherwise({
          redirectTo: '/not-found'
        });
    });

    app.run(function () {});

    app.controller('AppController', function ($scope) {

    });

    app.constant('flickrInfo', {
      apiKey: '963210deb0cad46f86d34bead8aeaaa1',
      method: 'flickr.photosets.getPhotos',
      photosetId: '72157648764240703',
      format: 'json'
    });
    app.constant('_', _);

}(angular.module("lizwebster", [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap'
])));

(function () {
  "use strict";
  angular.module("lizwebster")
    .controller("MainCtrl", function ($timeout, photoService, _) {

      var main = this;
      photoService.getPhotos().then(function (photos) {
        main.myMom = _.shuffle(photos.data.photoset.photo);
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
console.log('heightratio: ',heightratio);
            var widthdiff = heightratio * bgwidth;
            var heightdiff = widthratio * bgheight;
console.log('heightdiff: ', heightdiff);
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

(function() {
    'use strict';

    angular
        .module('lizwebster')
        .factory('photoService', factory);

    factory.$inject = ['$http', 'flickrInfo'];

    function factory($http, flickrInfo) {
        var service = {
            getPhotos: getPhotos
        };

        return service;

        function getPhotos() {
          return $http.get('https://api.flickr.com/services/rest/?method='+ flickrInfo.method +'&api_key='+ flickrInfo.apiKey +'&photoset_id='+ flickrInfo.photosetId +'&format='+ flickrInfo.format +'&nojsoncallback=1');
        }
    }

})();
