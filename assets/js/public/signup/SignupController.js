angular.module('SignupModule').controller('SignupController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// disable loading
	$scope.signupForm = {
		loading: false
	}

	$scope.submitSignupForm = function(){
		$scope.signupForm.loading = true;

		$http.post('/signup', {
			name: $scope.signupForm.name,
			title: $scope.signupForm.title,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

		if (sailsResponse.status === 409) {
			toastr.error('Ten email jest już zarejestrowny.', 'Błąd');
			return;
		}

		toastr.error('Wystąpił błąd, spróbuj ponownie.', 'Błąd');
		return;

		})
		.finally(function eitherWay(){
			$scope.signupForm.loading = false;
		})
	}

	$scope.submitLoginForm = function (){
    $scope.loginForm.loading = true;

    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
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
    .finally(function eitherWay(){
      $scope.loginForm.loading = false;
    });
  };

}]);
