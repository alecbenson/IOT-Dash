'use strict';


angular.module('iotdash')
	.controller('inputsController', function ($scope, $http) {
		$scope.newInput = {};
		$scope.inputs = [];
		$scope.newInput.params = [];
		$scope.methods = ['GET', 'POST'];

		//Post a new input
		$scope.postNewInput = function () {
			//Filter empty keys or values
			$scope.newInput.params = $scope.newInput.params.filter(function (val) {
				return val.hasOwnProperty('key') && val.hasOwnProperty('value');
			});
			$http.post('/inputs', $scope.newInput)
				.success(function () {
					$('#add-input-form').modal('hide');
					$scope.getInputs();
					$scope.newInput = {};
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

		//Adds a new input parameter
		$scope.addParameter = function () {
			$scope.newInput.params.push({});
		}

		//Retrieves data from the input
		$scope.getInputData = function (input) {
			$http.get('/inputs/single/' + input._id + '/data').success(function (data) {
				input.response = data;
			}).error(function (err) {
				input.response = err;
			});
		};

		//Set the new input object to the specified input
		$scope.editInput = function (input) {
			$scope.newInput = input;
		}

		//Update input list every minute
		setInterval(function () {
			$scope.getInputs();
		}, 60 * 1000);
		$scope.getInputs();
	});
