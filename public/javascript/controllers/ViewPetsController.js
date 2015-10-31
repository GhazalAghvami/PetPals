(function() {
  'use strict';
  angular.module('app')
    .controller('ViewPetsController', ViewPetsController);

  function ViewPetsController(PetFactory, $state, UserFactory, $mdDialog) {
    var vm = this;
    vm.status = UserFactory.status;
    vm.showBio = false;


    PetFactory.getAllPets().then(function(res) {
      vm.pets = res;

    for (var i=0; i< vm.pets.length; i++ ){
      switch (vm.pets[i].type) {
        case 'Dog':
          vm.pets[i].typeImage = "/images/dog.png";
          break;
        case 'Cat':
          vm.pets[i].typeImage = "/images/cat.png";
          break;
        case 'Rabbit':
          vm.pets[i].typeImage = "/images/rabbit.png";
          break;
        case 'Fish':
          vm.pets[i].typeImage = "/images/fish.png";
          break;
        case 'Bird':
          vm.pets[i].typeImage = "/images/bird.png";
          break;
        case 'Other':
          vm.pets[i].typeImage = "/images/mouse.png";
          break;
      }
    }

    });

    vm.deletePet = function(pet) {
      PetFactory.deletePet(pet).then(function() {
        vm.pets.splice(vm.pets.indexOf(pet), 1);
      });
    };

    vm.editPet = function(id, obj) {
      localStorage.setItem('tempPet', JSON.stringify(obj));
      $state.go('EditPet', {
        id: id
      });
    };

    // vm.showBio = function(bio) {
    //     $mdDialog.show({
    //       controller: DialogController,
    //       templateUrl: 'Bio.html',
    //       parent: angular.element(document.body),
    //       targetEvent: bio,
    //       clickOutsideToClose:true
    //     });
    //   };
    //   //   .then(function(answer) {
    //   //     $scope.status = 'You said the information was "' + answer + '".';
    //   //   }, function() {
    //   //     $scope.status = 'You cancelled the dialog.';
    //   //   });
    //   // };
    // function DialogController($scope, $mdDialog) {
    //   $scope.hide = function() {
    //     $mdDialog.hide();
    //   };
    //   $scope.cancel = function() {
    //     $mdDialog.cancel();
    //   };
    //   $scope.answer = function(answer) {
    //     $mdDialog.hide(answer);
    //   };
    // }
  }
})();
