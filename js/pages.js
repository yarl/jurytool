/**
 * LOGIN
 */
app.controller('LoginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.page = "login";

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

/**
 * DASHBOARD
 */
app.controller('DashboardCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.page = "dash";

    $scope.loading = true;
    $scope.countries = {
      PL: 'Poland',
      CZ: 'Czech Republic'
    };

    $scope.filter = {
      mine: false,
      opened: false
    };

    $http({method: 'GET', url: 'actions.php?action=getUser'}).
            success(function(data, status, headers, config) {
              if (data === "No access")
                $location.path("/login");
              else {
                var d = data;
                $scope.user = d.user;
                $scope.country = d.country;
                $scope.getList($scope.country);
              }
            }).
            error(function(data, status, headers, config) {
              alert("Error");
              console.log(data);
            });

    $scope.getList = function(country) {
      $http({method: 'GET', url: 'list/' + country.toLowerCase() + '.min.json'}).
              success(function(data, status, headers, config) {
                $scope.list = data;
                $scope.batches = Math.ceil(Object.keys($scope.list).length / 100);
                $scope.getBatches();
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };

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

    $scope.assignBatch = function(number) {
      $http({method: 'GET', url: 'actions.php?action=assignBatch&number=' + number}).
              success(function(data, status, headers, config) {
                $scope.getBatches();
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };

    $scope.releaseBatch = function(number) {
      $http({method: 'GET', url: 'actions.php?action=releaseBatch&number=' + number}).
              success(function(data, status, headers, config) {
                $scope.getBatches();
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };

    $scope.closeBatch = function(number) {
      $http({method: 'GET', url: 'actions.php?action=closeBatch&number=' + number}).
              success(function(data, status, headers, config) {
                $scope.getBatches();
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };

    $scope.openBatch = function(number) {
      $http({method: 'GET', url: 'actions.php?action=openBatch&number=' + number}).
              success(function(data, status, headers, config) {
                $scope.getBatches();
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };

    $scope.filterBatch = function(filter) {
      $scope.filter[filter] = !$scope.filter[filter];
    };
  }]);

/**
 * BATCH
 */
app.controller('BatchCtrl', ['$scope', '$http', '$location', '$routeParams', '$modal', '$alert', function($scope, $http, $location, $routeParams, $modal, $alert) {
    $scope.id = $routeParams.id;
    $scope.page = "batch";

    $scope.loading = true;

    $scope.data = {};
    $scope.size = 3;
    $scope.show = 2; //2: all / 0: no / 1: yes

    $scope.votes = {
      yes: 0,
      no: 0
    };

    $http({method: 'GET', url: 'actions.php?action=getUser'}).
            success(function(data, status, headers, config) {
              if (data === "No access")
                $location.path("/login");
              else {
                var d = data;
                $scope.user = d.user;
                $scope.country = d.country;
                $scope.getList($scope.country);
              }
            }).
            error(function(data, status, headers, config) {
              alert("Error");
              console.log(data);
            });

    $scope.getList = function(country) {
      $http({method: 'GET', url: 'list/' + country.toLowerCase() + '.min.json'}).
              success(function(data, status, headers, config) {
                $scope.range = [];
                for (var i = $scope.id * 100 - 100, max = $scope.id * 100; i < max; i++)
                  $scope.range.push(data[i]);
                $scope.loading = false;
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };

    $scope.getBatch = function() {
      $http({method: 'GET', url: 'actions.php?action=getBatch&number=' + $scope.id}).
              success(function(data, status, headers, config) {
                $scope.batch = data.results;
                for (var i in $scope.batch.data)
                  $scope.data[i] = $scope.batch.data[i];
                $scope.countVotes();
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };
    $scope.getBatch();

    $scope.setSize = function(size) {
      $scope.size = size;
    };

    $scope.voteYes = function(number) {
      $scope.data[number] = 1;
      $scope.countVotes();
    };

    $scope.voteNo = function(number) {
      $scope.data[number] = 0;
      $scope.countVotes();
    };

    $scope.countVotes = function() {
      $scope.votes.yes = $scope.votes.no = 0;
      for (var i in $scope.data)
        if ($scope.data[i])
          $scope.votes.yes++;
        else
          $scope.votes.no++;
    };

    $scope.saveData = function() {
      $scope.busy = true;
      $http({
        method: 'POST',
        url: 'actions.php?action=saveBatch',
        data: 'data=' + JSON.stringify({
          number: $scope.id,
          data: JSON.stringify($scope.data)
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
              success(function(data, status, headers, config) {
                if (data === "No access")
                  $location.path("/login");
                if (data === "1") {
                  $alert({
                    title: 'Success',
                    content: 'Changes saved.',
                    placement: 'top-right', type: 'success', show: true, duration: 1
                  });
                  $scope.busy = false;
                  $scope.getBatch();
                }
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };

    $scope.closeBatch = function() {
      $http({method: 'GET', url: 'actions.php?action=closeBatch&number=' + $scope.id}).
              success(function(data, status, headers, config) {
                if (data === "No access")
                  $location.path("/login");
                $location.path("/");
              }).
              error(function(data, status, headers, config) {
                alert("Error");
                console.log(data);
              });
    };

    $scope.showVote = function(vote) {
      $scope.show = ($scope.show === vote) ? 2 : vote;
    };

    $scope.openFile = function(index) {
      $scope.file = $scope.range[index];

      var myModal = $modal({
        placement: 'center',
        scope: $scope,
        template: 'partials/file.html',
        show: true
      });
    };
  }]);