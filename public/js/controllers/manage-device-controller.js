angular.module('iotdash')
  .controller('manageDeviceController', function($scope) {

    console.log('Manage controler running');
    $scope.addDevice = function() {
        console.log('Adding device');
    };

  });
