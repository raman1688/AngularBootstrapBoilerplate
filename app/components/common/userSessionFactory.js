	'use strict';
	app.factory('UserSessionFactory', ['$rootScope', function($rootScope) {
			//Store sensitive information about the user here and it will be deleted on app close
			//Not all information can be stored encrypted in JSONStore due to security constraints
			var defaultUserInfo = {
						"LOGIN_ID": "",
						"MSISDN": "sample",
						"NAME": "",
						"EMAIL": "",
						"PASSWORD": "",
						"CUST_IMG": "",
						"ID_IMG": "",
						"GENDER": "",
						"ID_NUMBER": "",
						"DOB": "",
						"PLACE_OF_BIRTH": "",
						"ALT_NUMBER": "",
						"MAIDEN_NAME": "",
						"ADDRESS": "",
						"ACT_STATUS": "",
						"ACT_DATE": "",
						"ICC_ID": ""
                       
			};	
			
			var userInfo = {};
			
			angular.extend(userInfo, defaultUserInfo);
			
			//public functions
			return {
				
				
				//Return user information from the session data
				getUserInfo : function() {
					return userInfo;
				},
				//set new user info
				//input: newInfo = {key : any type}
				setUserInfo : function(newInfo) {
					angular.extend(userInfo, newInfo);
					console.log("setUserInfo with:"+JSON.stringify(newInfo)+" userInfo after="+JSON.stringify(userInfo));
					return userInfo;
				},		
				
				
				//reset is used if the user logs out
				resetUserSessionData : function() {
					
					userInfo = {};					
					angular.extend(userInfo, defaultUserInfo);
					
					return true;
				}	
				
												
			}
			
		}]);


