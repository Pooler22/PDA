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
            $mdToast.show($mdToast.simple()
              .content('Kurs dodany')
              .action('OK')
              .position('bottom left')
              .highlightAction(false));
              console.log(sailsResponse.data.id);
              window.location = '/course/edit/' + sailsResponse.data.id;
          })
          .catch(function onError(sailsResponse) {
            $mdToast.show($mdToast.simple()
              .content('Wystąpił błąd, spróbuj ponownie.')
              .action('OK')
              .position('bottom left')
              .highlightAction(false));
              console.log(sailsResponse);
  //          window.location = '/course/edit/';
          });
      };

      $scope.submitUpdateCourseForm = function ($event) {
        $http.post('/course/update/' + $event, {
            name: $scope.updateCourseForm.name,
            type: $scope.updateCourseForm.type,
            shortdescription: $scope.updateCourseForm.shortdescription,
          })
          .then(function onSuccess(sailsResponse) {
            var toast = $mdToast.simple()
              .content('Kurs zaktualizowany')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            console.log($event);
            console.log($scope.updateCourseForm);
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

      $scope.submitAddChapterForm = function ($owner) {
        $http.post('/chapter/create', {
            name: $scope.createChapterForm.name,
            order: $scope.createChapterForm.order,
            content: $scope.createChapterForm.content,
            owner: $owner
          })
          .then(function onSuccess(sailsResponse) {
            var toast = $mdToast.simple()
              .content('Rozdział dodany')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            console.log($owner);
            console.log($scope.updateCourseForm);
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

      $scope.submitUpdateChapterForm = function ($chapter) {
        $http.post('/chapter/update/', {
            id: $chapter,
            name: $scope.updateChapterForm.name,
            order: $scope.updateChapterForm.order,
            content: $scope.updateChapterForm.content,
            owner: $scope.updateChapterForm.owner
          })
          .then(function onSuccess(sailsResponse) {
            var toast = $mdToast.simple()
              .content('Rozdział uaktualniony')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            //console.log($owner);
            console.log($scope.updateChapterForm);
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

      $scope.submitDestroyChapterForm = function ($chapter) {
        $http.post('/chapter/destroy/', {
            id: $chapter
          })
          .then(function onSuccess(sailsResponse) {
            var toast = $mdToast.simple()
              .content('Rozdział usunięty')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            //console.log($owner);
            //console.log($scope.updateChapterForm);
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
