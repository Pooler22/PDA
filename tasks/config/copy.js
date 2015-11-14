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
				cwd: './node_modules/angular-mocks/',
				src: ['angular-mocks.js'],
				dest: './assets/js/dependencies/'
			},{
				expand: true,
				cwd: './node_modules/angular/',
				src: ['angular.js'],
				dest: './assets/js/dependencies/'
			},{
				expand: true,
				cwd: './node_modules/angular-moment/',
				src: ['angular-moment.js'],
				dest: './assets/js/dependencies/'
			},{
				expand: true,
				cwd: './node_modules/angular-route/',
				src: ['angular-route.js'],
				dest: './assets/js/dependencies/'
			},{
				expand: true,
				cwd: './node_modules/angular-toastr/dist/',
				src: ['**.min.js'],
				dest: './assets/js/dependencies/'
			},{
				expand: true,
				cwd: './node_modules/moment/min/',
				src: ['moment.min.js'],
				dest: './assets/js/dependencies/'
			}, {
				expand: true,
				cwd: './node_modules/angular-toastr/dist/',
				src: ['angular-toastr.css'],
				dest: './assets/styles/dependencies/'
			}, {
				expand: true,
				cwd: './node_modules/angular-material-data-table/dist/',
				src: ['md-data-table.min.css'],
				dest: './assets/styles/dependencies/'
			}, {
				expand: true,
				cwd: './node_modules/angular-material-data-table/dist/',
				src: ['md-data-table.min.js'],
				dest: './assets/js/dependencies/'
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
