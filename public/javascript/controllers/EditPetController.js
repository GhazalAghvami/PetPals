(function() {
	'use strict';
	angular.module('app')
	.controller('EditPetController', EditPetController);

	function EditPetController(PetFactory, $stateParams, $state) {
		var vm = this;

		vm.editPet = JSON.parse(localStorage.tempPet);

		vm.updatePet = function(){
			PetFactory.putPet(vm.editPet).then(function(){
				$state.go('ViewPets');
			});
		};


	}
})();
