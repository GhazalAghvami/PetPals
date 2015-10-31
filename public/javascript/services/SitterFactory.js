(function() {
	'use strict';
	angular.module('app')
	.factory('SitterFactory', SitterFactory);

	function SitterFactory($http, $q) {
		var o = {};

	o.postSitter = function(sitter) {
		 var q = $q.defer();
		 	$http.post('/api/sitter', sitter).then(function(res){
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


o.putSitter = function (sitter) {
	var q = $q.defer();
$http.put('/api/sitter/' + sitter._id, sitter).then(function(res){
		q.resolve(res.data);
	});
	return q.promise;
};


		return o;
	}
})();
