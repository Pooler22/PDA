angular.module('PDAModule')
  .controller('NavbarController', ['$scope', '$http', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$mdToast',
    function ($scope, $http, $mdDialog, $timeout, $mdSidenav, $log, $mdToast) {

      $scope.closeDialog = function () {
        $mdDialog.hide();
      };


      $scope.logOut = function () {
        console.log('logout');
        $http({
            method: 'GET',
            url: '/session/destroy'
          })
          .finally(function eitherWay() {
            var toast = $mdToast.simple()
              .content('Zostałeś wylogowany')
              .action('OK')
              .position('top right')
              .highlightAction(false);
            $mdToast.show(toast);
            window.location = '/';
            // $scope.loginForm.loading = false;
            //console.log("logout2");
          });
      };


      $scope.logIn = function ($event) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          url: '/',
          templateUrl: '../templates/loginForm.html',
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



}]);
