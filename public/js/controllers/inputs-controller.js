angular.module('iotdash')
  .controller('inputsController', function($scope, $http) {
    $scope.newInput = {};
    $scope.inputs = [];

    //Post a new input
    $scope.postNewInput = function() {
      $http.post('/inputs', $scope.newInput)
        .success( function (data) {
          $('#add-input-form').modal('hide');
          $scope.inputs();
      });
    };

    //Delete an input
    $scope.deleteInput = function(id) {
      $http.delete('/inputs/' + id)
        .success( function (data) {
          $scope.getInputs();
      });
    };

    //Get input list
    $scope.getInputs = function () {
      $http.get('/inputs/all').success(function (inputs) {
        $scope.inputs = inputs;
      }).error(function (err) {
        console.log('Failed to get inputs: ' + err);
        $scope.inputs = [];
      });
    };

    //Update input list every minute
    setInterval(function () {
      $scope.getInputs();
    }, 60*1000);
    $scope.getInputs();
  });
