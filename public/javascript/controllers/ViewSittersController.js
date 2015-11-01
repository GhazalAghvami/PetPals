(function() {
  'use strict';
  angular.module('app')
    .controller('ViewSittersController', ViewSittersController);

  function ViewSittersController(SitterFactory, $state, UserFactory, $mdDialog) {
    var vm = this;
		vm.status = UserFactory.status;
      var alert;

      vm.items = [{
        icon: "<i class='zmdi zmdi-wrench>''</i>",
        link: "EditSitter"
      }, {
        icon: '<i class="zmdi zmdi-scissors"></i>',
        link: ""
      }, {
          icon: '<i class="zmdi zmdi-more-vert"></i>',
          link: "Contact"
      }];


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

    vm.showAlert = function(a) {
      alert = $mdDialog.alert({
        title: a.name + " in Suite #" + a.unit ,
        content: a.bio,
        ok: 'Okay!',
      });
      $mdDialog
        .show(alert)
        .finally(function() {
          alert = undefined;
        });
    };


  }
})();
