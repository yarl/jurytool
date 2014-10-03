var app = angular.module('juryApp', ['ngAnimate', 'ngSanitize', 'ngRoute']);

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