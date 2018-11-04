'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg:        grunt.file.readJSON('package.json'),
        jshint:     grunt.file.readJSON('grunt/jshint.json'),
        uglify:     grunt.file.readJSON('grunt/uglify.json'),
        clean:      grunt.file.readJSON('grunt/clean.json'),
        watch:      grunt.file.readJSON('grunt/watch.json'),
        concat:     grunt.file.readJSON('grunt/concat.json'),
        copy:       grunt.file.readJSON('grunt/copy.json')
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('setup',   ['concat:lib', 'copy']);
    grunt.registerTask('compile', ['clean:core', 'jshint:js', 'concat:js']);

    grunt.registerTask('default', ['setup', 'compile']);
    grunt.registerTask('build',   ['clean', 'setup', 'concat', 'uglify']);
};