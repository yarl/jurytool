/**
 * DASHBOARD
 */
app.controller('DashboardCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.loading = true;
    
    $http({method: 'GET', url: 'actions.php?action=getUser'}).
            success(function(data, status, headers, config) {
              if (data === "")
                $location.path("/login");
              else {
                var d = data;
                $scope.user = d.user;
                $scope.country = d.country;
              }
            }).
            error(function(data, status, headers, config) {
              alert("Error");
              console.log(data);
            });

    $http({method: 'GET', url: 'list/poland.min.json'}).
            success(function(data, status, headers, config) {
              $scope.list = data;
              $scope.batches = Math.ceil(Object.keys($scope.list).length / 100);
              $scope.getBatches();
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

    $scope.getBatches = function() {
      $http({method: 'GET', url: 'actions.php?action=getBatchAll'}).
              success(function(data, status, headers, config) {
                $scope.batch = data.results;
                $scope.loading = false;
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