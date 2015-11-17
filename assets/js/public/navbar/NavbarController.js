angular.module('PDAModule', ['ngMaterial', 'ngSails']).controller('NavbarController', ['$scope', '$http', '$mdDialog', '$timeout', '$mdSidenav', '$log', function($scope, $http, $mdDialog, $timeout, $mdSidenav, $log) {

  $scope.items = [1, 2, 3];

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.signUp = function($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      template: '<md-dialog aria-label="List dialog">' +
        '<md-form ng-submit="submitLoginForm()">' +
        '  <md-dialog-content>' +
        '   <md-input-container>' +
        '    <label>Email</label>' +
        '    <input ng-model="loginForm.email" type="email" name="email">' +
        '   </md-input-container>' +
        '   <md-input-container>' +
        '    <label>Haslo</label>' +
        '    <input ng-model="loginForm.password" type="password" name="password">' +
        '   </md-input-container>' +
        '   <md-input type="hidden" name="_csrf" value="<%= _csrf %>" />' +
        '  </md-dialog-content>' +
        '  <div class="md-actions">' +
        '   <md-button ng-click="closeDialog()" class="md-primary">' +
        '     Close Dialog' +
        '   </md-button>' +
        '   <md-button ng-click="submitLoginForm()">Zaloguj się</md-button>' +
        '  </div>' +
        ' </md-form>' +
        '</md-dialog>',
      locals: {
        items: $scope.items
      },
      controller: DialogController
    });

    function DialogController(scope, $mdDialog, items, $http) {
      scope.items = items;
      scope.closeDialog = function() {
        $mdDialog.hide();
      };

      $scope.submitLoginForm = function() {
        $scope.loginForm.loading = true;
        $http.put('/login', {
            email: $scope.loginForm.email,
            password: $scope.loginForm.password
          })
          .then(function onSuccess() {
            window.location = '/';
            console.log("wow");
          })
          .catch(function onError(res) {
            if (res.status === 400 || res.status === 404) {
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
    }
  };

  $scope.logIn = function($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      template: '<md-dialog aria-label="List dialog">' +
        '<md-form ng-submit="submitLoginForm()">' +
        '  <md-dialog-content>' +
        '   <md-input-container>' +
        '    <label>Email</label>' +
        '    <input ng-model="loginForm.email" type="email" name="email">' +
        '   </md-input-container>' +
        '   <md-input-container>' +
        '    <label>Haslo</label>' +
        '    <input ng-model="loginForm.password" type="password" name="password">' +
        '   </md-input-container>' +
        '   <md-input type="hidden" name="_csrf" value="<%= _csrf %>" />' +
        '  </md-dialog-content>' +
        '  <div class="md-actions">' +
        '   <md-button ng-click="closeDialog()" class="md-primary">' +
        '     Close Dialog' +
        '   </md-button>' +
        '   <md-button ng-click="submitLoginForm()">Zaloguj się</md-button>' +
        '  </div>' +
        ' </md-form>' +
        '</md-dialog>',
      locals: {
        items: $scope.items
      },
      controller: DialogController
    });

    function DialogController(scope, $mdDialog, items, $http) {
      scope.items = items;
      scope.closeDialog = function() {
        $mdDialog.hide();
      };

      $scope.submitLoginForm = function() {
        $scope.loginForm.loading = true;
        $http.put('/login', {
            email: $scope.loginForm.email,
            password: $scope.loginForm.password
          })
          .then(function onSuccess() {
            window.location = '/';
            console.log("wow");
          })
          .catch(function onError(res) {
            if (res.status === 400 || res.status === 404) {
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
    }
  };



  $scope.closeDialog = function() {
    $mdDialog.hide();
  };
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
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
        timer = $timeout(function() {
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
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  }])
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });
