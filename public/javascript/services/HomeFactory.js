(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q) {
		var o = {};


		o.addMsg = function(indx) {
		  var q = $q.defer();
		  $http.post('/api/chats', indx).success(function(){
		  q.resolve();
		});
		return q.promise;
		};

		o.getMsg = function () {
		  var q = $q.defer();
		  $http.get('/api/chats').success(function(res){
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
