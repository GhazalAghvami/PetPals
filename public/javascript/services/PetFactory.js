(function() {
	'use strict';
	angular.module('app')
	.factory('PetFactory', PetFactory);

function PetFactory($http, $q) {
		var o = {};

o.postPet = function(pet) {
 var q = $q.defer();
 	$http.post('/api/pet', pet).then(function(res){
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

o.putPet = function (pet) {
	var q = $q.defer();
$http.put('/api/pet/' + pet._id, pet).then(function(res){
		q.resolve(res.data);
	});
	return q.promise;
};


		return o;
	}
})();
