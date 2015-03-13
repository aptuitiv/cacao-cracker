module.exports = function(grunt) {

    grunt.initConfig({

        // Global build settings
        global: {
            // Local modules
            src: 'src',
            // Build destination
            dest: 'dist',
            // main site module
            site: '<%= global.src %>/site',
            // bower components directory
            bower: 'bower_components',
            // cacao directory
            cacao: '<%= global.bower %>/cacao'
        },

        sass: {
            site: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= global.dest %>/layout/css/main.css': '<%= global.site %>/styles/index.scss'
                }
            }
        },

        copy: {
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= global.site %>/assets',
                    src: ['**/*', '!**/README.md', '!**/*.{png,jpg,gif}'],
                    dest: '<%= global.dest %>'
                }]
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= global.src %>/scripts',
                    src: ['**/*.js'],
                    dest: '<%= global.dest %>/layout/js'
                }]
            }
        },

        watch: {
            config: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            sass: {
                files: ['<%= global.site %>/styles/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['<%= global.site %>/scripts/**/*.js'],
                tasks: ['uglify']
            },
            assets: {
                files: ['<%= global.site %>/assets/**/*', '!<%= global.site %>/assets/**/README.md'],
                tasks: ['copy:site', 'htmlmin:dist']
            }
        },

        connect: {
            site: {
                options: {
                    port: '8080',
                    base: 'dist'
                }
            }
        }

    });


    // cacao modules
    require('./bower_components/cacao/modules/normalize/Gruntfile.js')(grunt);
    require('./bower_components/cacao/modules/jquery/Gruntfile.js')(grunt);
    require('./bower_components/cacao/modules/ddmenu/Gruntfile.js')(grunt);
    require('./bower_components/cacao/modules/magnific/Gruntfile.js')(grunt);
    require('./bower_components/cacao/modules/slider/Gruntfile.js')(grunt);
    require('./bower_components/cacao/modules/slick/Gruntfile.js')(grunt);


    // npm tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');

    // custom tasks
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['copy', 'replace', 'sass', 'uglify']);

    // default task
    grunt.registerTask('default', ['build', 'serve']);



};

