angular.module('iotdash')
  .controller('manageDeviceController', function($scope, $http) {
    $scope.newDevice = {};

    //Post a new device
    $scope.postNewDevice = function() {
      $http.post('/devices', $scope.newDevice)
        .success( function (data) {
          $('#add-device-form').modal('hide');
          $scope.getDevices();
      });
    };

    //Get device list
    $scope.getDevices = function () {
      $http.get('/devices').success(function (devices) {
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