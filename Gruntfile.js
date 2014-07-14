module.exports = function(grunt) {
	grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  
  concat: {
    options: {
      stripBanners: true,
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> development version compiled on ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
    },
    dev: {
      src: ['src/js/*.js'],
      dest: 'js/main.js',
    },
  },

  uglify: {
    prod: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> Build date: ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
      }
      files: {
        'js/main.min.js': ['src/js/*.js'],
      }
    }
  },

  jshint: {
    dev: ['src/js/*.js'],
    gruntfile: ['Gruntfile.js'],
  },

  less: {
    dev: {
      files: {
        "css/main.css": "src/less/*.less",
      }
    },
    prod: {
      options: {
        cleancss: true,
      },
      files: {
        "css/main.min.css": "src/less/*.less",
      },
    },
  },

  watch: {
    js: {
      files: ['src/js/*.js'],
      tasks: ['jshint:dev', 'concat:dev'],
    },
    less: {
      files: ['src/less/*.less'],
      tasks: ['less:dev'],
    },
    gruntfile: {
      files: ['Gruntfile.js'],
      tasks: ['jshint:gruntfile'],
    },
  },



});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');


grunt.registerTask('dev', ['jshint:dev', 'concat:dev', 'less:dev']);
grunt.registerTask('prof', ['uglify:prod', 'less:prod']);


};