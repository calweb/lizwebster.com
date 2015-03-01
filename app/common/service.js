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
