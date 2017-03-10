angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.factory('calendarService', function($http) {

    return {
        getCalendar: function(type) {
            return $http({
                method: "GET",
                url: '/api/action/calendar',
                headers: {
                    'Client-Service': 'frontend-client',
                    'Auth-Key': 'simplerestapi'
                },
                params: {
                    type: type
                }
            }).then(function(response) {
                return response.data;
            });
        }
    }

})

.controller('CalendrierCtrl', function($scope, calendarService) {

  $scope.calendar = "animes";

  $scope.displayCalendar = function(){
      var calendar = calendarService.getCalendar($scope.calendar);

      calendar.then(function(response) {
          if ( response.status == 200 ) {
              $scope.days = response.infos;
          }

      });
  }

  $scope.displayCalendar();
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
