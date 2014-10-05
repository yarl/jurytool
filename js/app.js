var app = angular.module('juryApp', ['ngAnimate', 'ngSanitize', 'ngRoute', 'mgcrea.ngStrap']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
            when('/', {
              templateUrl: 'partials/dashboard.html',
              controller: 'DashboardCtrl'
            }).
            when('/login', {
              templateUrl: 'partials/login.html',
              controller: 'LoginCtrl'
            }).
            when('/batch/:id', {
              templateUrl: 'partials/batch.html',
              controller: 'BatchCtrl'
            }).
            when('/photo/:id', {
              templateUrl: 'partials/photo.html',
              controller: 'PhotoCtrl'
            }).
            otherwise({
              redirectTo: '/'
            });
  }]);

app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

// http://stackoverflow.com/a/17122325/1418878
app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});