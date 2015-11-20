angular.module('PDAModule')
  .controller('UpdateProfileController', ['$scope', '$http', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$mdToast',
    function ($scope, $http, $mdDialog, $timeout, $mdSidenav, $log, $mdToast) {


      $scope.updateProfileForm = function ($event) {
        $http({
            method: 'GET',
            url: '/user/edit/1'
          })
          .then(function onSuccess(sailsResponse) {

            var parentEl = angular.element(document.body);
            $mdDialog.show({
              parent: parentEl,
              targetEvent: $event,
              url: '/',
              templateUrl: '../../templates/updateProfileForm.html',
              controller: DialogController
            });


            $scope.updateProfileForm.name = sailsResponse.data.name;
            $scope.updateProfileForm.nick = sailsResponse.data.nick;
            $scope.updateProfileForm.email = sailsResponse.data.email;


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


  }
]);
