angular.module('PDAModule', ['ngMaterial', 'ngSails']).controller('AppCtrl', ['$scope', '$sails', '$http', '$filter', '$interval', '$mdSidenav', '$mdDialog', function($scope, $sails, $http, $filter, $interval, $mdSidenav, $mdDialog) {
  $scope.clearValue = function() {
    $scope.myModel = undefined;
  };
  $scope.save = function() {
    alert('Form was valid!');
  };
  $scope.submitLoginForm = function() {
    console.log("what?");

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

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.deletePost = function(postId) {

    if (typeof postId === 'number') {

      var req = {
        method: 'POST',
        url: '/posts/destroy?id=' + postId
      };

      $http(req);

    }

  };

  $scope.determinateValue = 0;

  $scope.$on('$destroy', function() {

    $interval.cancel(postsLoading);

  });

  $scope.demo = {
    topDirections: ['left', 'up'],
    bottomDirections: ['down', 'right'],
    availableModes: ['md-fling', 'md-scale'],
    selectedMode: 'md-fling',
    availableDirections: ['up', 'down', 'left', 'right'],
    selectedDirection: 'down'
  };

  $scope.posts = [];

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: '/templates/createNewPost.html',
        parent: angular.element(document.body),
        targetEvent: ev
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
  };

  (function() {

    $sails.get("/posts")
      .success(function(data, status, headers, jwr) {

        $scope.posts = data;
        $scope.determinateValue = 100;

      })
      .error(function(data, status, headers, jwr) {

        throw new Error(data);

      });

    $sails.on("posts", function(message) {

      if (message.verb == "destroyed") {

        var index = $filter('getIndex')($scope.posts, parseInt(message.id, 10));
        $scope.posts.splice(index, 1);

      } else if (message.verb == "created") {
        $scope.posts.push(message.data);
      }

    });

  }());

}]);

function DialogController($scope, $mdDialog, $http) {

  $scope.colors = ["green", "gray", "yellow", "blue", "purple", "red"];

  $scope.createPost = function(newPost) {

    var req = {
      method: 'POST',
      url: '/posts/create',
      data: newPost
    };

    $http(req)
      .success(function(data) {
        $mdDialog.cancel();
      })
      .error(function(data) {
        console.log(data);
      });

  };

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

angular.module('PDAModule').filter('getIndex', function() {
  return function(input, id) {
    var i = 0,
      len = input.length;
    for (; i < len; i++) {
      if (+input[i].id == +id) {
        return i;
      }
    }
    return null;
  };
});

angular.module('PDAModule').controller('nutritionController', ['$nutrition', '$scope', function($nutrition, $scope) {
  'use strict';

  $scope.selected = [];

  $scope.query = {
    filter: '',
    order: 'name',
    limit: 5,
    page: 1
  };

  function success(desserts) {
    $scope.desserts = desserts;
  }

  // in the future we may see a few built in alternate headers but in the mean time
  // you can implement your own search header and do something like
  $scope.search = function(predicate) {
    $scope.filter = predicate;
    $scope.deferred = $nutrition.desserts.get($scope.query, success).$promise;
  };

  $scope.onOrderChange = function(order) {
    return $nutrition.desserts.get($scope.query, success).$promise;
  };

  $scope.onPaginationChange = function(page, limit) {
    return $nutrition.desserts.get($scope.query, success).$promise;
  };

}]);
