(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  function HomeController($state, UserFactory, $stateParams) {
    var vm = this;
    vm.status = UserFactory.status;
    vm.posts = {name:vm.status.name, unit:vm.status.unit};


    vm.contact = function() {
      $state.go("Home");
    };
  }
})();
