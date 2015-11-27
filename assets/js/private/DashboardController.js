angular.module('PDAModule', ['ngMaterial', 'ngSails'])
  .controller('DashboardController', ['$scope', '$http', '$mdDialog', '$timeout', '$mdSidenav', '$log',
    function ($scope, $http, $mdDialog, $timeout, $mdSidenav, $log) {

      $scope.logOut = function () {
        console.log('logout');
        $http({
          method: 'GET',
          url: '/logout'
        });
      };
      
    }
  ]);
