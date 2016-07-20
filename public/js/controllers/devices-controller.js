'use strict';

angular.module('iotdash')
	.controller('devicesController', function ($scope, $http) {
		$scope.newDevice = {};
		$scope.devices = [];
		$scope.triggers = [];

		$scope.initNewDevice = function () {
			$scope.newDevice = {};
			$scope.newDevice.triggers = [{}];
		}
		$scope.initNewDevice();

		//Post a new device
		$scope.postNewDevice = function () {
			$http.post('/devices', $scope.newDevice)
				.success(function () {
					$('#add-device-form').modal('hide');
					$scope.getDevices();
				});
		};

		//Delete a device
		$scope.deleteDevice = function (id) {
			$http.delete('/devices/' + id)
				.success(function () {
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

		//Get triggers list
		$scope.getTriggers = function () {
			$http.get('/triggers/all').success(function (triggers) {
				$scope.triggers = triggers;
			}).error(function (err) {
				console.log('Failed to get triggers: ' + err);
				$scope.triggers = [];
			});
		};

		//Adds a new trigger to the device
		$scope.addTrigger = function () {
			//Push the new trigger to the array
			$scope.newDevice.triggers.push({});
		}

		//Set the new device object to the specified device
		$scope.editDevice = function (device) {
			$scope.newDevice = device;
		}

		//Update device list every minute
		setInterval(function () {
			$scope.getDevices();
			$scope.getTriggers();
		}, 60 * 1000);
		$scope.getDevices();
		$scope.getTriggers();
	});
