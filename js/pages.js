/**
 * DASHBOARD
 */
app.controller('DashboardCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http({method: 'GET', url: 'actions.php?action=getUserName'}).
            success(function(data, status, headers, config) {
              if (data === "")
                $location.path("/login");
              else
                $scope.user = data;
            }).
            error(function(data, status, headers, config) {
              alert("Error");
              console.log(data);
            });

    $scope.logOut = function() {
      $http({method: 'GET', url: 'actions.php?action=logout'}).
              success(function(data, status, headers, config) {
                if (data === "OK")
                  $location.path("/login");
                else
                  alert(data);
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };
  }]);

/**
 * LOGIN
 */
app.controller('LoginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.countries = [
      {id: 'PL', name: 'Poland'},
      {id: 'CZ', name: 'Czech Republic'}
    ];
    $scope.country = $scope.countries[0];

    $scope.login = function() {
      $http({
        method: 'POST',
        url: 'login.php',
        data: 'data=' + JSON.stringify({
          country: $scope.country.id,
          name: $scope.user,
          pass: $scope.pass
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
              success(function(data, status, headers, config) {
                if (data === "OK") {
                  $location.path("/");
                } else {
                  $scope.alert = data;
                }
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };
  }]);

/*
 * app.controller('DashboardCtrl', ['$scope', '$routeParams',
 function($scope, $routeParams) {
 $scope.id = $routeParams.id;
 */