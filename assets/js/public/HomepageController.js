angular.module('PDAModule')
  .controller('HomepageController', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {

      $scope.aboutPage = function () {
        console.log(1);
        window.location = '/about';
      };

      $scope.designPatternPage = function () {
        console.log(1);
        window.location = '/design-pattern';
      };

      $scope.bestPracticePage = function () {
        console.log(1);
        window.location = '/best-practice';
      };

}]);
