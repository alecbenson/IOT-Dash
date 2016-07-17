'use strict';

angular.module('iotdash')
	.controller('triggersController', function ($scope, $http, $filter) {
		$scope.newTrigger = {};
		$scope.triggers = [];
		$scope.inputs = [];
		$scope.filteredTriggers = [];
		$scope.triggerFilter = '';

		//Post a new trigger
		$scope.postNewTrigger = function () {
			$http.post('/triggers', $scope.newTrigger)
				.success(function () {
					$('#add-trigger-form').modal('hide');
					$scope.getTriggers();
				});
		};

		//Delete a trigger
		$scope.deleteTrigger = function (id) {
			$http.delete('/triggers/' + id)
				.success(function () {
					$scope.getTriggers();
				});
		};

		//Get triggers list
		$scope.getTriggers = function () {
			$http.get('/triggers/all').success(function (triggers) {
				$scope.triggers = triggers;
				//Filter through updated set of triggers
				filterTriggers();
			}).error(function (err) {
				console.log('Failed to get triggers: ' + err);
				$scope.triggers = [];
			});
		};

		//Get inputs list
		$scope.getInputs = function () {
			$http.get('/inputs/all').success(function (inputs) {
				$scope.inputs = inputs;
			}).error(function (err) {
				console.log('Failed to get inputs: ' + err);
				$scope.inputs = [];
			});
		};

		//Filter through $scope.triggers and put results into $scope.filteredTriggers
		function filterTriggers() {
			$scope.filteredTriggers = $filter('filter')($scope.triggers, {
				$: $scope.triggerFilter
			});
		}

		//Run whenever the search box is typed into
		$scope.$watch('triggerFilter', function () {
			filterTriggers();
		});

		//Update trigger/input list every minute
		setInterval(function () {
			$scope.getInputs();
			$scope.getTriggers();
		}, 60 * 1000);
		//Set default value
		$scope.getInputs();
		$scope.getTriggers();

	});
