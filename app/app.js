
	var app = angular.module('app', ['ui.router', 'pascalprecht.translate']);
	
	app.init = function () {
		
		angular.bootstrap(document, ['app']);
		console.log("bootstrap done ");
	};
            
	app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $controllerProvider, $translateProvider){

		console.log("in app config");
		
		$urlRouterProvider.when('', '/login');
		
		
		$translateProvider.useStaticFilesLoader({
		  prefix: 'i18n/',
		  suffix: '.json'
		});
		
		
		//Set the default Language
		$translateProvider.preferredLanguage('en');
	
        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'app/shared/404.html'
            })
           .state('login', {
				url: '/login',
				templateUrl: 'app/components/login/login.view.html',
				controller: 'loginController',
				controllerUrl: 'app/components/login/login.controller',
				controllerAs: 'Ctrl'
            })

    }]);
    
    app.run(['$window', '$rootScope','$state',function($window, $rootScope,$state,utilService) {
		console.log("in app run");		
		/*$rootScope.online = navigator.onLine;
		$window.addEventListener("offline", function () {
			$rootScope.$apply(function() {
			  $rootScope.online = false;
				console.log("OFFLINE");
			});
		}, false);
		$window.addEventListener("online", function () {
			$rootScope.$apply(function() {
			  $rootScope.online = true;
				console.log("ONLINE");
			});
		}, false);*/
        
     $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    	
    		  
    		  if( navigator.userAgent.match(/Android/i)
				  || navigator.userAgent.match(/webOS/i)
				  || navigator.userAgent.match(/iPhone/i)
				  || navigator.userAgent.match(/iPad/i)
				  || navigator.userAgent.match(/iPod/i)
				  || navigator.userAgent.match(/BlackBerry/i)
				  || navigator.userAgent.match(/Windows Phone/i)
				  ){
					 return true;
				   }
				  else {
					  
					//  window.location = "https://indosatooredoo.com/id/personal";
				   }		
         
     });
	 
  return app;
}]);
    


