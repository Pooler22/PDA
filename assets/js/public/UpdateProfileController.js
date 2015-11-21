angular.module('PDAModule')
  .controller('UpdateProfileController', ['$scope', '$http', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$mdToast',
    function ($scope, $http, $mdDialog, $timeout, $mdSidenav, $log, $mdToast) {

      $scope.updateProfileForm = function ($event) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          url: '/',
          templateUrl: '../../templates/updateProfileForm.html',
          controller: DialogController,
          locals: {
            $scope: $scope
          },
        });

        function DialogController($scope, $mdDialog, $http) {
          $http.get('/user/edit/' + $event)
            .then(function onSuccess(sailsResponse) {
              $scope.updateProfileForm = sailsResponse.data.user;
            });

          $scope.closeDialog = function () {
            $mdDialog.hide();
          };

          $scope.submitUpdateProfileForm = function () {
            $http.put('/user/update/' + $event, {
                name: $scope.updateProfileForm.name,
                nick: $scope.updateProfileForm.nick,
                email: $scope.updateProfileForm.email,
              })
              .then(function onSuccess() {
                // window.location = '/';
                var toast1 = $mdToast.simple()
                  .content('Dane zaktualizowane.')
                  .action('OK')
                  .position('top right')
                  .highlightAction(false);
                $mdToast.show(toast1);
              })
              .catch(function onError(res) {
                var toast = $mdToast.simple()
                  .content('Wystąpił błąd.')
                  .action('OK')
                  .position('top right')
                  .highlightAction(false);
                $mdToast.show(toast);
                return;
              });
          };
        }
      };
  }
]);
