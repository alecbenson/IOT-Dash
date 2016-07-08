'use strict';


angular.module('iotdash')
	.controller('inputsController', function ($scope, $http) {
		$scope.newInput = {};
		$scope.inputs = [];

		//Post a new input
		$scope.postNewInput = function () {
			$http.post('/inputs', $scope.newInput)
				.success(function () {
					$('#add-input-form').modal('hide');
					$scope.getInputs();
				});
		};

		//Delete an input
		$scope.deleteInput = function (id) {
			$http.delete('/inputs/' + id)
				.success(function () {
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
		}, 60 * 1000);
		$scope.getInputs();
	});
