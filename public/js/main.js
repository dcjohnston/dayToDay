(function(){
    require.config({
        paths: {
            'angular': '../bower_components/angular/angular',
            'angularAMD': '../bower_components/angularAMD/angularAMD'
        },
        shim: {
            'angularAMD': ['angular'],
        },
        deps: ['app']


    });
})()
