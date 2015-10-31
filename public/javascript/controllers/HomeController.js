(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController($state, UserFactory, $stateParams) {
		var vm = this;
		vm.msg ={};
		vm.status = UserFactory.status;

console.log(vm.status);

vm.contact = function(){
$state.go("Home");
};
	}
})();
