(function() {
  'use strict';
  angular.module('app', ['ui.router', 'ngMaterial'])
    .config(Config);

  function Config($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('Home', {
        url: '/',
        templateUrl: '/views/Home.html'
      })
      .state('About', {
        url: '/about',
        templateUrl: '/views/About.html'
      })
      .state('Chat', {
        url: '/chat',
        templateUrl: 'views/chat.html'
      })
      .state('Contact', {
        url: '/contact',
        templateUrl: 'views/Contact.html'
      })
      .state('AddPet', {
        url: '/addpet/:id',
        templateUrl: 'views/AddPet.html'
      })
      .state('EditPet', {
        url: '/editpet/:id',
        templateUrl: 'views/EditPet.html'
      })
      .state('AddSitter', {
        url: '/addsitter',
        templateUrl: 'views/AddSitter.html'
      })
			.state('EditSitter', {
				url: '/editsitter',
				templateUrl: 'views/EditSitter.html'
			})
      .state('ViewSitters', {
        url: '/viewsitters/:id',
        templateUrl: 'views/ViewSitters.html'
      })
			.state('ViewPets', {
				url: '/viewpets/:id',
				templateUrl: 'views/ViewPets.html'
			})
      .state('RegLog', {
        url: '/reglog',
        templateUrl: 'views/RegLog.html'
      });
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('AuthInterceptor');

  }
})();
