module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			files: {
				src: ['./index.js', './lib/**/*.js']
			}
		},
		mochaTest: {
			options: {
				reporter: 'spec'
			},
			src: ['./index.js', 'test/**/*-spec.js']
		}
	});
	require('load-grunt-tasks')(grunt);
	grunt.registerTask('test', ['jshint', 'mochaTest']);
};
