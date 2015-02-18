define(['angularAMD'], function(angularAMD){
    var myApp = angular.module('myApp', []);

    // when this module is required, we get var myApp as argument
    return angularAMD.bootstrap(myApp);
});
