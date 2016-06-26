angular.module('iotdash')
  .controller('triggersController', function($scope, $http) {
    $scope.newTrigger = {};
    $scope.triggers = [];

    //Post a new trigger
    $scope.postNewTrigger = function() {
      $http.post('/triggers', $scope.newTrigger)
        .success( function (data) {
          $('#add-trigger-form').modal('hide');
          $scope.getTriggers();
      });
    };

    //Delete a trigger
    $scope.deleteTrigger = function(id) {
      $http.delete('/triggers/' + id)
        .success( function (data) {
          $scope.getTriggers();
      });
    };

    //Get triggers list
    $scope.getTriggers = function () {
      $http.get('/triggers').success(function (triggers) {
        $scope.triggers = triggers;
      }).error(function (err) {
        console.log('Failed to get triggers: ' + err);
        $scope.triggers = [];
      });
    };

    //Update trigger list every minute
    setInterval(function () {
      $scope.getTriggers();
    }, 60*1000);
    $scope.getTriggers();
  });
