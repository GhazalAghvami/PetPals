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
                templateUrl: 'views/Chat.html'
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

(function() {
    'use strict';
    angular.module('app')
        .filter('usernameFilter', usernameFilter);

    function usernameFilter() {
        return function(item) {
            var str = item.split("");
            str[0] = str[0].toUpperCase();
            return str.join("");
        };
    }

})();

(function() {
    'use strict';
    angular.module('app')
        .controller('AddPetController', AddPetController);

    function AddPetController(PetFactory, $state, UserFactory) {
        var vm = this;
        vm.status = UserFactory.status;
        vm.pet = {
            owner: vm.status.name,
            unit: vm.status.unit
        };

        vm.addPet = function() {
            PetFactory.postPet(vm.pet).then(function(res) {
                $state.go("ViewPets");
            });
        };

    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('AddSitterController', AddSitterController);

    function AddSitterController(SitterFactory, $state, UserFactory) {
        var vm = this;
        vm.status = UserFactory.status;
        vm.sitter = {
            name: vm.status.name,
            unit: vm.status.unit
        };

        vm.addSitter = function() {
            SitterFactory.postSitter(vm.sitter).then(function(res) {
                $state.go("ViewSitters");
            });
        };


    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('EditPetController', EditPetController);

    function EditPetController(PetFactory, $stateParams, $state) {
        var vm = this;

        vm.editPet = JSON.parse(localStorage.tempPet);

        vm.updatePet = function() {
            PetFactory.putPet(vm.editPet).then(function() {
                $state.go('ViewPets');
            });
        };


    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('EditSitterController', EditSitterController);

    function EditSitterController(SitterFactory, $stateParams, $state) {
        var vm = this;

        vm.editSitter = JSON.parse(localStorage.tempSitter);

        vm.updateSitter = function() {
            SitterFactory.putSitter(vm.editSitter).then(function() {
                $state.go('ViewSitters');
            });
        };

    }
})();

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
            vm.showSimpleToast('Goodbye ' + name + '! Come back soon.');
            UserFactory.logout();
        };

        vm.register = function() {
            UserFactory.register(vm.user).then(function() {
                vm.close();
                var name = vm.status.name.split("");
                name[0] = name[0].toUpperCase();
                name = name.join("");
                vm.showSimpleToast('Welcome to Pets & Pals, ' + name + '!');
            }, function(err) {
                vm.registerError = "Username already exists in our database";
            });
        };

        vm.login = function() {
            UserFactory.login(vm.user).then(function() {
                vm.close();
                var name = vm.status.name.split("");
                name[0] = name[0].toUpperCase();
                name = name.join("");
                vm.showSimpleToast('Welcome Back, ' + name + '!');
            }, function(err) {
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

(function() {
    'use strict';
    angular.module('app')
        .controller('HomeController', HomeController);

    function HomeController($state, UserFactory, $stateParams, HomeFactory) {
        var vm = this;
        vm.status = UserFactory.status;
        vm.chats = {
            name: vm.status.name,
            unit: vm.status.unit
        };
        vm.msg = {
            name: vm.status.name,
            unit: vm.status.unit,
            email: vm.status.email
        };

        vm.addMsg = function() {
            HomeFactory.addMsg(vm.chats).then(function(res) {
                vm.msgs.unshift(res);
                vm.chats.msg = null;
            });
        };

        vm.getMsg = function() {
            HomeFactory.getMsg().then(function(msgs) {
                vm.msgs = msgs;
            });
        };

        vm.getMsg();
        //  setInterval(vm.getMsg, 500);

        vm.contact = function() {
            $state.go("Home");
        };
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('ViewPetsController', ViewPetsController);

    function ViewPetsController(PetFactory, $state, UserFactory, $mdDialog) {
        var vm = this;
        var alert;
        vm.status = UserFactory.status;

        PetFactory.getAllPets().then(function(res) {
            vm.pets = res;
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

        vm.showAlert = function(a) {
            alert = $mdDialog.alert({
                title: a.name + " the " + a.type,
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
            $state.go('EditSitter', {
                id: id
            });
        };

        vm.showAlert = function(a) {
            alert = $mdDialog.alert({
                title: a.name + " in Suite #" + a.unit,
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

(function() {
    "use strict";
    angular.module('app')
        .factory('AuthInterceptor', AuthInterceptor);

    function AuthInterceptor($window) {
        var o = {
            request: function(config) {
                if ($window.localStorage.getItem('token')) {
                    config.headers.authorization = "Bearer " + $window.localStorage.getItem('token');
                }
                return config;
            }
        };

        return o;
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('HomeFactory', HomeFactory);

    function HomeFactory($http, $q) {
        var o = {};


        o.addMsg = function(indx) {
            var q = $q.defer();
            $http.post('/api/chats', indx).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.getMsg = function() {
            var q = $q.defer();
            $http.get('/api/chats').success(function(res) {
                var msgs = [];
                for (var prop in res) {
                    res[prop]._id = prop;
                    msgs.unshift(res[prop]);
                }
                q.resolve(msgs);
            });
            return q.promise;
        };


        return o;
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('PetFactory', PetFactory);

    function PetFactory($http, $q) {
        var o = {};

        o.postPet = function(pet) {
            var q = $q.defer();
            $http.post('/api/pet', pet).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.getAllPets = function() {
            var q = $q.defer();
            $http.get('/api/pet').then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.deletePet = function(pet) {
            var q = $q.defer();
            $http.delete('/api/pet/' + pet._id).then(function() {
                q.resolve();
            });
            return q.promise;
        };

        o.putPet = function(pet) {
            var q = $q.defer();
            $http.put('/api/pet/' + pet._id, pet).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };


        return o;
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('SitterFactory', SitterFactory);

    function SitterFactory($http, $q) {
        var o = {};

        o.postSitter = function(sitter) {
            var q = $q.defer();
            $http.post('/api/sitter', sitter).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.getAllSitters = function() {
            var q = $q.defer();
            $http.get('/api/sitter').then(function(res) {
                q.resolve(res.data);

            });
            return q.promise;
        };

        o.deleteSitter = function(sitter) {
            var q = $q.defer();
            $http.delete('/api/sitter/' + sitter._id).then(function() {
                q.resolve();
            });
            return q.promise;
        };


        o.putSitter = function(sitter) {
            var q = $q.defer();
            $http.put('/api/sitter/' + sitter._id, sitter).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };


        return o;
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('UserFactory', UserFactory);

    function UserFactory($http, $q) {
        var o = {};
        o.status = {};

        o.register = function(user) {
            var q = $q.defer();
            $http.post('/api/users/register', user).then(function(res) {
                setToken(res.data);
                setUser();
                q.resolve(res.data);
            }, function(err) {
                q.reject(err);
            });
            return q.promise;
        };

        o.login = function(user) {
            var q = $q.defer();
            $http.post('/api/users/login', user).then(function(res) {
                setToken(res.data);
                setUser();
                q.resolve(res.data);
            }, function(err) {
                q.reject(err);
            });
            return q.promise;
        };

        o.logout = function() {
            removeToken();
            removeUser();
        };

        function setUser() {
            var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
            o.status.username = user.username;
            o.status.name = user.name;
            o.status._id = user._id;
            o.status.email = user.email;
            o.status.unit = user.unit;
        }

        function removeUser() {
            o.status.username = null;
            o.status._id = null;
            o.status.email = null;
            o.status.unit = null;
        }

        function getToken() {
            return localStorage.getItem('token');
        }

        function setToken(token) {
            return localStorage.setItem('token', token);
        }

        function removeToken() {
            return localStorage.removeItem('token');
        }

        function urlBase64Decode(str) {
            var output = str.replace(/-/g, '+').replace(/_/g, '/');
            switch (output.length % 4) {
                case 0:
                    {
                        break;
                    }
                case 2:
                    {
                        output += '==';
                        break;
                    }
                case 3:
                    {
                        output += '=';
                        break;
                    }
                default:
                    {
                        throw 'Illegal base64url string!';
                    }
            }
            return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
        }

        if (getToken()) setUser();

        return o;
    }
})();