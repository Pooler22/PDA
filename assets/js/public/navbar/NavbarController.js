angular.module('PDAModule').controller('NavbarController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
  $scope.loginForm = {
    loading: false
  };
  $scope.submitLoginForm = function() {
    $scope.loginForm.loading = true;
    $http.put('/session/create', {
        email: $scope.loginForm.email,
        password: $scope.loginForm.password
      })
      .then(function onSuccess() {
        window.location = '/';
      })
      .catch(function onError(sailsResponse) {
        if (sailsResponse.status === 400 || sailsResponse.status === 404) {
          toastr.error('Niepoprawne hasło/login.', 'Błąd', {
            closeButton: true
          });
          return;
        }
        toastr.error('Wystąpił błąd, spróbuj ponownie.', 'Błąd', {
          closeButton: true
        });
        return;
      })
      .finally(function eitherWay() {
        $scope.loginForm.loading = false;
      });
  };
}]);
