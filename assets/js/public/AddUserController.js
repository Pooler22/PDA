angular.module('PDAModule')
  .controller('AddUserController', ['$scope', '$http', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$mdToast',
    function ($scope, $http, $mdDialog, $timeout, $mdSidenav, $log, $mdToast) {

      $scope.closeDialog = function () {
        $mdDialog.hide();
      };


      $scope.signUp = function ($event) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          url: '/',
          templateUrl: './templates/addUserForm.html',
          controller: DialogController
        });

        function DialogController($scope, $mdDialog, $http) {
          $scope.closeDialog = function () {
            $mdDialog.hide();
          };

          $scope.submitSignupForm = function () {
            $http.post('/user/adduser', {
                name: $scope.signupForm.name,
                nick: $scope.signupForm.nick,
                email: $scope.signupForm.email,
                password: $scope.signupForm.password
              })
              .then(function onSuccess(sailsResponse) {
                var toast = $mdToast.simple()
                  .content('Użytkownik zarejestrowany')
                  .action('OK')
                  .position('top right')
                  .highlightAction(false);
                $mdToast.show(toast);
              })
              .catch(function onError(sailsResponse) {
                if (sailsResponse.status === 409) {
                  var toast = $mdToast.simple()
                    .content('Ten email jest już zarejestrowny.')
                    .action('OK')
                    .position('top right')
                    .highlightAction(false);
                  $mdToast.show(toast);
                  return;
                }
                var toast1 = $mdToast.simple()
                  .content('Wystąpił błąd, spróbuj ponownie.')
                  .action('OK')
                  .position('top right')
                  .highlightAction(false);
                $mdToast.show(toast1);
                return;

              })
              .finally(function eitherWay() {
                //window.location = '/';

              });
          };
        }
      };


      $scope.closeDialog = function () {
        $mdDialog.hide();
      };



      $scope.logIn = function ($event) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          url: '/',
          templateUrl: './templates/loginForm.html',
          controller: DialogController
        });

        function DialogController($scope, $mdDialog, $http) {
          $scope.closeDialog = function () {
            $mdDialog.hide();
          };

          $scope.submitLoginForm = function () {
            //$scope.loginForm.loading = true;
            $http.put('/login', {
                email: $scope.loginForm.email,
                password: $scope.loginForm.password
              })
              .then(function onSuccess() {
                //window.location = '/';
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
