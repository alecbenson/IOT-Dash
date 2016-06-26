angular.module('iotdash')
  .controller('manageDeviceController', function($scope, $http) {

    console.log('Manage controler running');

    //Post a new device
    $scope.newDevice = {};
    $scope.postNewDevice = function() {
      $http.post('/devices', $scope.newDevice)
        .success( function (data) {
          $('#add-device-form').modal('hide');
      });
    };

  });
