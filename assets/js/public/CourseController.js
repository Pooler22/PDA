angular.module('PDAModule')
  .controller('CourseController', ['$scope', '$http', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$mdToast',
    function ($scope, $http, $mdDialog, $timeout, $mdSidenav, $log, $mdToast) {

      $scope.submitNewCourseForm = function () {
        $http.post('/course/create', {
            name: $scope.newCourseForm.name,
            type: $scope.newCourseForm.type,
            shortdescription: $scope.newCourseForm.shortdescription,
          })
          .then(function onSuccess(sailsResponse) {
            var toast = $mdToast.simple()
              .content('Kurs dodany')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            console.log(sailsResponse);
            $mdToast.show(toast);
            // window.location = '/course/edit/';
          })
          .catch(function onError(sailsResponse) {
            var toast1 = $mdToast.simple()
              .content('Wystąpił błąd, spróbuj ponownie.')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            $mdToast.show(toast1);
            return;
          })
          .finally(function eitherWay() {});
      };

      $scope.submitUpdateCourseForm = function () {
        $http.post('/course/update', {
            id: $scope.newCourseForm.id,
            name: $scope.newCourseForm.name,
            type: $scope.newCourseForm.type,
            shortdescription: $scope.newCourseForm.shortdescription,
          })
          .then(function onSuccess(sailsResponse) {
            var toast = $mdToast.simple()
              .content('Kurs zaktualizowany')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            console.log(sailsResponse);
            $mdToast.show(toast);
            // window.location = '/course/edit/';
          })
          .catch(function onError(sailsResponse) {
            var toast1 = $mdToast.simple()
              .content('Wystąpił błąd, spróbuj ponownie.')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            $mdToast.show(toast1);
            return;
          })
          .finally(function eitherWay() {});
      };
    }
]);
