(function() {
	'use strict';
	angular.module('app')
	.filter('usernameFilter', usernameFilter);

function usernameFilter (){
  return function(item){
    var str = item.split("");
    str[0] = str[0].toUpperCase();
    return str.join("");
  };
}

})();
