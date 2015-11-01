(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  function HomeController($state, UserFactory, $stateParams, HomeFactory) {
    var vm = this;
    vm.status = UserFactory.status;
    vm.chats = {name:vm.status.name, unit:vm.status.unit};
    vm.msg = {name:vm.status.name, unit:vm.status.unit, email: vm.status.email};

    vm.addMsg = function() {
      HomeFactory.addMsg(vm.chats).then(function(){
       vm.chats = {};
      });
    };

    vm.getMsg = function(){
      HomeFactory.getMsg().then(function(msgs){
        vm.msgs = msgs;
      });
    };

    setInterval(vm.getMsg, 500);


    vm.contact = function() {
      $state.go("Home");
    };
  }
})();
