(function() {
	'use strict';
	angular.module('app')
	.controller('EditSitterController', EditSitterController);

	function EditSitterController(SitterFactory, $stateParams, $state) {
		var vm = this;

		vm.editSitter = JSON.parse(localStorage.tempSitter);

		vm.updateSitter = function(){
			SitterFactory.putSitter(vm.editSitter).then(function(){
				$state.go('ViewSitters');
			});
		};

	}
})();
