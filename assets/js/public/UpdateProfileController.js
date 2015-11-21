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
          $http.get('/user/edit/')
            .then(function onSuccess(sailsResponse) {
              // console.log(sailsResponse.data.user.name);
              console.log(sailsResponse.data.user.nick);
              console.log(sailsResponse.data.user.email);
              $scope.wow = sailsResponse.data.user.name;

              // $scope.name = sailsResponse.data.user.name;
              // $scope.nick = sailsResponse.data.user.nick;
              // $scope.email = sailsResponse.data.user.email;
              console.log(sailsResponse);
            });

          $scope.closeDialog = function () {
            $mdDialog.hide();
          };

          $scope.submitLoginForm = function () {
            $http.put('/login', {
                email: $scope.loginForm.email,
                password: $scope.loginForm.password
              })
              .then(function onSuccess() {
                window.location = '/';
                var toast1 = $mdToast.simple()
                  .content('Zostałeś zalogowany.')
                  .action('OK')
                  .position('top right')
                  .highlightAction(false);
                $mdToast.show(toast1);
              })
              .catch(function onError(res) {
                if (res.status === 400 || res.status === 404) {
                  var toast1 = $mdToast.simple()
                    .content('Niepoprawne hasło/login.')
                    .action('OK')
                    .position('top right')
                    .highlightAction(false);
                  $mdToast.show(toast1);
                  return;
                }
                var toast = $mdToast.simple()
                  .content('Wystąpił błąd.')
                  .action('OK')
                  .position('top right')
                  .highlightAction(false);
                $mdToast.show(toast);
                return;
              })
              .finally(function eitherWay() {
                console.log("42");
              });
          };
        }
      };


  }
]);
