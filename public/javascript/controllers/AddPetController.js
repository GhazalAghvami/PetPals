(function() {
	'use strict';
	angular.module('app')
	.controller('AddPetController', AddPetController);

	function AddPetController(PetFactory, $state, UserFactory) {
		var vm = this;
		vm.status = UserFactory.status;
		vm.pet = {owner:vm.status.name, unit:vm.status.unit};

  vm.addPet = function() {
	PetFactory.postPet(vm.pet).then(function(res){
		$state.go("ViewPets");
	});
};

	}
})();
