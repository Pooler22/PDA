angular.module('PDAModule').controller('SignupController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  // disable loading
  $scope.signupForm = {
    loading: false
  };

  $scope.submitSignupForm = function() {
    $scope.signupForm.loading = true;
    $http.post('/signup', {
        name: $scope.signupForm.name,
        nick: $scope.signupForm.nick,
        email: $scope.signupForm.email,
        password: $scope.signupForm.password
      })
      .then(function onSuccess(sailsResponse) {
        window.location = '/';
      })
      .catch(function onError(sailsResponse) {
        if (sailsResponse.status === 409) {
          toastr.error('Ten email jest już zarejestrowny.', 'Błąd');
          return;
        }
        toastr.error('Wystąpił błąd, spróbuj ponownie.', 'Błąd');
        return;
      })
      .finally(function eitherWay() {
        $scope.signupForm.loading = false;
      });
  };
}]);
