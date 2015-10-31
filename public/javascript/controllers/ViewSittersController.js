(function() {
  'use strict';
  angular.module('app')
    .controller('ViewSittersController', ViewSittersController);

  function ViewSittersController(SitterFactory,$state, UserFactory) {
    var vm = this;
		vm.status = UserFactory.status;
    vm.showBio = false; 


    SitterFactory.getAllSitters().then(function(res) {
      vm.sitters = res;
    });

    vm.deleteSitter = function(sitter) {
      SitterFactory.deleteSitter(sitter).then(function() {
        vm.sitters.splice(vm.sitters.indexOf(sitter), 1);
      });
    };

    vm.editSitter = function(id, obj) {
      localStorage.setItem('tempSitter', JSON.stringify(obj));
      $state.go('EditSitter', {id: id});
    };

  }
})();
