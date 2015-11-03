(function() {
  'use strict';
  angular.module('app', ['ui.router', 'ngMaterial'])
    .config(Config);

  function Config($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('Home', {
        url: '/',
        templateUrl: 'templates/Home.html'
      })
      .state('About', {
        url: '/about',
        templateUrl: 'templates/about.html'
      })
      .state('Chat', {
        url: '/chat',
        templateUrl: 'templates/Chat.html'
      })
      .state('Contact', {
        url: '/contact',
        templateUrl: 'templates/Contact.html'
      })
      .state('AddPet', {
        url: '/addpet/:id',
        templateUrl: 'templates/AddPet.html'
      })
      .state('EditPet', {
        url: '/editpet/:id',
        templateUrl: 'templates/EditPet.html'
      })
      .state('AddSitter', {
        url: '/addsitter',
        templateUrl: 'templates/AddSitter.html'
      })
			.state('EditSitter', {
				url: '/editsitter',
				templateUrl: 'templates/EditSitter.html'
			})
      .state('ViewSitters', {
        url: '/templatesitters/:id',
        templateUrl: 'templates/ViewSitters.html'
      })
			.state('ViewPets', {
				url: '/viewpets/:id',
				templateUrl: 'templates/ViewPets.html'
			})
      .state('RegLog', {
        url: '/reglog',
        templateUrl: 'templates/RegLog.html'
      });
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('AuthInterceptor');

  }
})();
