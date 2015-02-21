module.exports = function(grunt) {
    

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            dev: {
                tasks: ["jshint", "nodemon", "watch"],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        jshint: {
            files: ['public/js/**/*.js'],  
        },
        // restart server after edit
        nodemon: {
            // dev is a target, i.e. a specific configuration for the task
            dev: {
                script: 'server.js',
                watch: ["server"],
                delay: 300,

                callback: function(nodemon) {
                    nodemon.on('config:update', function() {
                        setTimeout(function(){
                            require('open')('http://127.0.0.1:5000');
                        },1000);
                    });
                    nodemon.on('restart', function(){
                        setTimeout(function(){
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                        }, 1000);
                    });                    
                }
            }
        },
        watch: {
            files:['<%= jshint.files %>'], //templating outputs values of props in config object
            tasks: ['jshint']
        }
    });
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['concurrent:dev']);
};
