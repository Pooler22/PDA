angular.module('PDAModule')
  .controller('HomepageController', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {

      $scope.aboutPage = function () {
        window.location = '/about';
      };

      $scope.designPatternPage = function () {
        window.location = '/design-pattern';
      };

      $scope.bestPracticePage = function () {
        window.location = '/best-practice';
      };

}]);
