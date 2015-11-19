angular.module('PDAModule', ['ngMaterial', 'ngSails'])
  .controller('NavbarController', ['$scope', '$http', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$mdToast',
    function ($scope, $http, $mdDialog, $timeout, $mdSidenav, $log, $mdToast) {

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

      $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId)
          .toggle();
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



      $scope.closeDialog = function () {
        $mdDialog.hide();
      };
      $scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleRight = buildToggler('right');
      $scope.isOpenRight = function () {
        return $mdSidenav('right')
          .isOpen();
      };
      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      function debounce(func, wait, context) {
        var timer;
        return function debounced() {
          var context = $scope,
            args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function () {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildDelayedToggler(navID) {
        return debounce(function () {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }, 200);
      }

      function buildToggler(navID) {
        return function () {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        };
      }
    }
  ])
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left')
        .close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right')
        .close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });
