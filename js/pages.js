/**
 * DASHBOARD
 */
app.controller('DashboardCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.id = $routeParams.id;
  }]);

/**
 * LOGIN
 */
app.controller('LoginCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.countries = [
      {id: 'PL', name: 'Poland'},
      {id: 'CZ', name: 'Czech Republic'}
    ];

    $scope.login = function() {
      $http({
        method: 'GET',
        url: 'login.php',
        data: {
          country: $scope.country,
          name: $scope.user,
          pass: $scope.pass
        }
      }).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
    };
  }]);