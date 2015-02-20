(function(){
    require.config({
        paths: {
            'angular': '/bower_components/angular/angular',
            'angularAMD': '/bower_components/angularAMD/angularAMD',
            'ngload': '/bower_components/angularAMD/ngload',
            'localStorage': '/bower_components/angular-local-storage/dist/angular-local-storage',
            'ngAnimate': '/bower_components/angular-animate/angular-animate',
            'ui-router': '/bower_components/angular-ui-router/release/angular-ui-router',
            'ngResource': '/bower_components/angular-resource/angular-resource'
        },
        shim: {
            'angularAMD': ['angular'],
            'ngload': ['angularAMD'],
            'localStorage': ['angular'],
            'ngAnimate': ['angular'],
            'ui-router':['angular'],
            'ngResource': ['angular']
        },
        // kick off the application by requiring app.js
        deps: ['app']
    });
})();
