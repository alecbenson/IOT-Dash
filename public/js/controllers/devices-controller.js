angular.module('iotdash')
  .controller('devicesController', function($scope, $http) {
    $scope.newDevice = {};
    $scope.devices = [];

    //Post a new device
    $scope.postNewDevice = function() {
      $http.post('/devices', $scope.newDevice)
        .success( function (data) {
          $('#add-device-form').modal('hide');
          $scope.getDevices();
      });
    };

    //Delete a device
    $scope.deleteDevice = function(id) {
      $http.delete('/devices/' + id)
        .success( function (data) {
          $scope.getDevices();
      });
    };

    //Get device list
    $scope.getDevices = function () {
      $http.get('/devices/all').success(function (devices) {
        $scope.devices = devices;
      }).error(function (err) {
        console.log('Failed to get devices: ' + err);
        $scope.devices = [];
      });
    };

    //Update device list every minute
    setInterval(function () {
      $scope.getDevices();
    }, 60*1000);
    $scope.getDevices();
  });
