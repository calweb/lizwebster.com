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
