(function() {
  'use strict';
  angular.module('app')
    .controller('GlobalController', GlobalController);

  function GlobalController(UserFactory, $state, $mdToast, $mdSidenav) {
    var vm = this;
    vm.isLogin = true;
    vm.user = {};
    vm.status = UserFactory.status;

    vm.showSimpleToast = function(content) {
      $mdToast.show(
        $mdToast.simple()
        .content(content)
        .position("top right")
        .hideDelay(4000)
      );
    };

    vm.logout = function() {
      $state.go('Home');
      var name = vm.status.name.split("");
      name[0] = name[0].toUpperCase();
      name = name.join("");
      vm.showSimpleToast('Goodbye '+name+'! Come back soon.');
      UserFactory.logout();
    };

    vm.register = function() {
      UserFactory.register(vm.user).then(function() {
        vm.close();
        var name = vm.status.name.split("");
        name[0] = name[0].toUpperCase();
        name = name.join("");
        vm.showSimpleToast('Welcome to Pets & Pals, '+name+ '!');
      }, function(err){
        vm.registerError = "Username already exists in our database";
      });
    };

    vm.login = function() {
      UserFactory.login(vm.user).then(function() {
        vm.close();
        var name = vm.status.name.split("");
        name[0] = name[0].toUpperCase();
        name = name.join("");
        vm.showSimpleToast('Welcome Back, '+name+ '!');
      }, function(err){
        vm.loginError = "Incorrect Username or Password";
        vm.user.password = "";
      });

    };

    vm.toggleRight = function() {
      $mdSidenav('right').toggle();
    };

    vm.close = function() {
      $mdSidenav('right').toggle();
    };

  }
})();
