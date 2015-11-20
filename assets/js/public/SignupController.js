angular.module('PDAModule')
  .controller('HomepageController', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {

      $scope.closeDialog = function () {
        $mdDialog.hide();
      };


            $scope.signUp = function ($event) {
              var parentEl = angular.element(document.body);
              $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                url: '/',
                templateUrl: '../templates/signupForm.html',
                controller: DialogController
              });

              function DialogController($scope, $mdDialog, $http) {
                $scope.closeDialog = function () {
                  $mdDialog.hide();
                };

                $scope.submitSignupForm = function () {
                  $http.post('/signup', {
                      name: $scope.signupForm.name,
                      nick: $scope.signupForm.nick,
                      email: $scope.signupForm.email,
                      password: $scope.signupForm.password
                    })
                    .then(function onSuccess(sailsResponse) {
                      var toast = $mdToast.simple()
                        .content('Zostałeś zarejestrowany')
                        .action('OK')
                        .position('top right')
                        .highlightAction(false);
                      $mdToast.show(toast);
                      //console.log(1);
                      window.location = '/';
                    })
                    .catch(function onError(sailsResponse) {

                      if (sailsResponse.status === 409) {
                        var toast = $mdToast.simple()
                          .content('Ten email jest już zarejestrowny.')
                          .action('OK')
                          .position('top right')
                          .highlightAction(false);
                        $mdToast.show(toast);
                        console.log(2);
                        // toastr.error('Ten email jest już zarejestrowny.', 'Błąd');
                        return;
                      }
                      console.log(3);
                      var toast1 = $mdToast.simple()
                        .content('Wystąpił błąd, spróbuj ponownie.')
                        .action('OK')
                        .position('top right')
                        .highlightAction(false);
                      $mdToast.show(toast1);
                      // toastr.error('Wystąpił błąd, spróbuj ponownie.', 'Błąd');
                      return;

                    })
                    .finally(function eitherWay() {
                      console.log(4);
                      // $scope.signupForm.loading = false;
                    });
                };
              }
            };

}]);
