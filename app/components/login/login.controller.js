
    'use strict';
    
    app.controller('loginController', 
        ["$rootScope","$scope", "$state", 
         function ($rootScope,$scope) {
        
        var vm = this;
        $scope.showModal = false;
	    $scope.toggleModal = function(){
	    	//$scope.postRegistrationData();
	        $scope.showModal = !$scope.showModal;
	      
	    };

	    $scope.showErrorModal = false;
	    $scope.toggleErrorModal = function(){
	    	//$scope.postRegistrationData();
	    	$scope.showErrorModal = !$scope.showErrorModal;
	      
	    };
	    
	    $scope.doFbLogin= function(){
	    	console.log("doFBLogin Called");
    		iJoinfbservice.getFB();
	    };
	    
	    $scope.GplusLogin = function () {
	        GooglePlus.login().then(function (authResult) {
	            console.log(authResult);
	 
	            GooglePlus.getUser().then(function (user) {
	                $rootScope.gplususer = user;
					if(validationService.validateEmail(user.email)){
						$rootScope.isGplusLogin = true;
						console.log($rootScope.gplususer);
						var obj = {"LOGIN_ID": user.email,
								"EMAIL": user.email,
								"PASSWORD": null,
								"CUST_IMG": user.picture,
								"GENDER":user.gender};
						UserSessionFactory.setUserInfo(obj);
						var data ={"userid":user.email,"password":"","social_id":user.id,"social_idType":"gmail"};
						$scope.loginServiceCall(data,"");
					
					}else {
						// EMail is not found so user is not valid for login. 
						// show error message 
						$scope.errorMessage={
						header:Messages.alertTitleError,
						text:Messages.emptyemail,
						button:Messages.alertOkButton
						};
						$scope.toggleErrorModal();
					}
	            });
	        }, function (err) {
	            console.log(err);
						$("#processing").hide();
						$scope.errorMessage={
						header:Messages.serviceNetwrokErrorMsg,
		        		text:Messages.serviceAvailableMsg,
						button:Messages.alertOkButton
						};
						$scope.toggleErrorModal();
	        });
	    };
        $scope.trackOrder=function(){
        	if(!validationService.validateEmail($scope.login_id)){
				$scope.errorMessage={
	        		header:Messages.alertTitleError,
	        		text:Messages.emptyemail,
	        		button:Messages.alertOkButton
	        	};
	        	$scope.toggleErrorModal();
	        	return false;
			}else if(validationService.isEmpty($scope.password)){

				$scope.errorMessage={
	        		header:Messages.alertTitleError,
	        		text:Messages.emptypswrd,
	        		button:Messages.alertOkButton
	        	};
	        	$scope.toggleErrorModal();
	        	return false;
			}else if($scope.password.length<6){

				$scope.errorMessage={
	        		header:Messages.alertTitleError,
	        		text:Messages.passwordlength,
	        		button:Messages.alertOkButton
	        	};
	        	$scope.toggleErrorModal();
	        	return false;
			}else if(validationService.validateStringSpace($scope.password)){
				$scope.errorMessage={
	        		header:Messages.alertTitleError,
	        		text:Messages.inValidpassword,
	        		button:Messages.alertOkButton
	        	};
	        	$scope.toggleErrorModal();
	        	return false;
			}else{
				$("#loginModal").modal('hide');
				var data ={"userid":$scope.login_id,"password":$scope.password,"social_id":"","social_idType":""};
				$scope.loginServiceCall(data,"mannualLogin");
			}
        	
        	
        }
        
        $scope.loginServiceCall= function(data, text){
        	loginService.userLogin(data).then(function(response){
            	$("#processing").hide();
            	if(response.Status == "SUCCESS"){
            		console.log("response data:- ",response);
            		if(text == "mannualLogin"){
            			var obj = {
	            				"LOGIN_ID": $scope.login_id,
								"EMAIL": $scope.login_id,
								"PASSWORD": $scope.password,
								"CUST_IMG": "",
								"GENDER":""
							};
            			UserSessionFactory.setUserInfo(obj);
            		}
            		
            		if(localStorage.getItem("RegScreen")!="" && localStorage.getItem("RegScreen")!=null && localStorage.getItem("RegScreen")!=undefined){
            			var RegScreen = JSON.parse(localStorage.getItem("RegScreen"));
            			if(RegScreen.LOGIN_ID == data.userid){
            				$state.transitionTo(RegScreen.page);
            			}else{
            				$state.transitionTo('ordertrack');
            			}
            			
            		}else{
            			$state.transitionTo('ordertrack');
            		}
		  			
						
				}else if(response.Status == "FAILURE"){
					$scope.errorMessage={
		        		header:Messages.alertTitleError,
		        		text:response.ErrorDescription,
		        		button:Messages.alertOkButton
		        	};
		        	$scope.toggleErrorModal();
		        	return false;	
				}
            },function(error){
            	console.log("Error in receiving the Data" + error);
				$("#processing").hide();
				$scope.errorMessage={
		        		header:Messages.serviceNetwrokErrorMsg,
		        		text:Messages.serviceAvailableMsg,
		        		button:Messages.alertOkButton
	        	};
	        	$scope.toggleErrorModal();
	        	return false;
            });
        }
        
        
       
  	    
  	    $rootScope.$on('FBLoginFail', function() {
  	    	$rootScope.fbLogin = false;
              console.log("in event:FBLoginFail=");
              $("#processing").hide();
  			$scope.errorMessage={
  	        		header:Messages.serviceNetwrokErrorMsg,
  	        		text:Messages.serviceAvailableMsg,
  	        		button:Messages.alertOkButton
          	};
          	$scope.toggleErrorModal();
          	return false;

          });
  	    
  	    var destroyListener =  $rootScope.$on("FBLoginSuccess", function () {
            $rootScope.fbLogin = true;
            console.log("in event:FBLoginSuccess=" +$rootScope.fbUserInfo);
            var obj = {"LOGIN_ID": $rootScope.fbUserInfo.email,
					"EMAIL": $rootScope.fbUserInfo.email,
					"PASSWORD": null,
					"CUST_IMG": $rootScope.fbUserInfo.picture.data.url,
					"GENDER":$rootScope.fbUserInfo.gender};
			UserSessionFactory.setUserInfo(obj);
            var data ={"userid":$rootScope.fbUserInfo.email,"password":"","social_id":$rootScope.fbUserInfo.id,"social_idType":"facebook"};
            $scope.loginServiceCall(data);
        });
		
		$scope.$on('$destroy', destroyListener);

        return vm;
        
    }]);
