define(['angularAMD','models', 'localStorage', 'ui-router'], function(angularAMD){

    // if my app requires a module, i have to make sure
    // that the file containing it has been loaded
    var myApp = angular.module('myApp', ['modelsModule', 'LocalStorageModule', 'ui.router']);

    myApp.config(function(localStorageServiceProvider, $stateProvider, $urlRouterProvider, $locationProvider){
        localStorageServiceProvider.setPrefix('dayToDay');
        localStorageServiceProvider.setNotify(true, true);

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider.when('/', '/root');
        $urlRouterProvider.otherwise("/todos");

        $stateProvider.state('root', {
            url: "/todos",
        })
        .state('root.complete', {
            url: '/finished'
        })
        .state('root.todo', {
            url: '/incomplete'
        });
    });

    // when this module is required, we get var myApp as argument
    return angularAMD.bootstrap(myApp);
});

