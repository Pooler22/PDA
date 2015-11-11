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
        dest: './assets/js/dependencies/'
      },{
				expand: true,
				cwd: './node_modules/jquery-validation/dist/',
				src: ['jquery.validate.js'],
				dest: './assets/js/dependencies/'
			},{
				expand: true,
				cwd: './node_modules/bootstrap/dist/js/',
				src: ['bootstrap.js'],
				dest: './assets/js/dependencies/'
			},{
				expand: true,
				cwd: './node_modules/bootstrap/dist/css',
				src: ['**/*'],
				dest: './assets/styles/dependencies/'
			}, {
				expand: true,
				cwd: './node_modules/font-awesome/fonts/',
				src: ['**/*'],
				dest: './assets/fonts/dependencies'
			},{
				expand: true,
				cwd: './node_modules/bootstrap/dist/fonts',
				src: ['**/*'],
				dest: './assets/fonts/dependencies'
			},{
				expand: true,
				cwd: './node_modules/angular-toastr/dist/',
				src: ['angular-toastr.min.css'],
				dest: './assets/styles/dependencies/'
			},{
				expand: true,
				cwd: './node_modules/font-awesome/css/',
				src: ['**/*'],
				dest: './assets/styles/dependencies/'
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
