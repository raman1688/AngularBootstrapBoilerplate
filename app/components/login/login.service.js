
    'use strict';

    app.service('loginService', ['iJoinFactory',function(iJoinFactory){
    	var userLogin = function(data){
        	return iJoinFactory.getServicesData('userlogin',data);
        }
        return{
        	userLogin: userLogin
        }
    }]);
