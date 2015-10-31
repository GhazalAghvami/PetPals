(function() {
  'use strict';
  angular.module('app')
    .controller('AddSitterController', AddSitterController);

  function AddSitterController(SitterFactory, $state, UserFactory) {
    var vm = this;
    vm.status = UserFactory.status;
		vm.sitter = {name: vm.status.name, unit:vm.status.unit};

    vm.addSitter = function() {
      SitterFactory.postSitter(vm.sitter).then(function(res) {
        $state.go("ViewSitters");
      });
    };


  }
})();
