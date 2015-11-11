/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [{
        expand: true,
        cwd: './node_modules/jquery/dist/',
        src: ['jquery.js'],
        dest: './assets/dependencies/js/'
      },{
				expand: true,
				cwd: './node_modules/jquery-validation/dist/',
				src: ['jquery.validate.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/angular-mocks/',
				src: ['angular-mocks.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/angular/',
				src: ['angular.min.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/angular-moment/',
				src: ['angular-moment.min.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/angular-route/',
				src: ['angular-route.min.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/angular-toastr/dist/',
				src: ['angular-toastr.min.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/bootstrap/dist/js/',
				src: ['bootstrap.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/angular-bootstrap/',
				src: ['ui-bootstrap-tpls.min.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/moment/min/',
				src: ['moment.min.js'],
				dest: './assets/dependencies/js/'
			},{
				expand: true,
				cwd: './node_modules/bootstrap/dist/css',
				src: ['**/*'],
				dest: './assets/dependencies/styles/'
			}, {
				expand: true,
				cwd: './node_modules/font-awesome/fonts/',
				src: ['**/*'],
				dest: './assets/dependencies/fonts/'
			},{
				expand: true,
				cwd: './node_modules/bootstrap/dist/fonts',
				src: ['**/*'],
				dest: './assets/dependencies/fonts/'
			},{
				expand: true,
				cwd: './node_modules/angular-toastr/dist/',
				src: ['angular-toastr.min.css'],
				dest: './assets/dependencies/styles/'
			},{
				expand: true,
				cwd: './node_modules/font-awesome/css/',
				src: ['**/*'],
				dest: './assets/dependencies/styles/'
			},{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
