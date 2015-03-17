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

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'Explorer >= 8']
      },
      sourcemap_separate: {
        options: {
          map: {
            inline: false
          }
        },
        src: '<%= global.dest %>/layout/css/main.css',
        dest: '<%= global.dest %>/layout/css/main.css'
      }
    },

    copy: {
      site: {
        files: [{
          expand: true,
          cwd: '<%= global.site %>/assets',
          src: ['**/*', '!**/README.md', '!**/*.{png,jpg,gif}'],
          dest: '<%= global.dest %>'
        },{
          expand: true,
          cwd: '<%= global.site %>/assets',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= global.dest %>/layout/images'
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
          cwd: '<%= global.site %>/scripts',
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
        tasks: ['sass', 'autoprefixer']
      },
      js: {
        files: ['<%= global.site %>/scripts/**/*.js'],
        tasks: ['uglify']
      },
      assets: {
        files: ['<%= global.site %>/assets/**/*', '!<%= global.site %>/assets/**/README.md'],
        tasks: ['copy:site']
      }
    },

    connect: {
      site: {
        options: {
          port: '8080',
          base: '<%= global.dest %>'
        }
      }
    }

  });


  // modular build tasks
  require('./build/ddmenu.js')(grunt);
  require('./build/jquery.js')(grunt);
  require('./build/magnific.js')(grunt);
  require('./build/slick.js')(grunt);


  // npm tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // custom tasks
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('build', ['copy', 'replace', 'sass', 'autoprefixer', 'uglify']);

  // default task
  grunt.registerTask('default', ['build', 'serve']);



};

