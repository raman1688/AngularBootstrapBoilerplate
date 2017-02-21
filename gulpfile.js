var gulp = require('gulp');
var minify = require('gulp-minifier');
var argv = require('yargs').argv;
var clean = require('gulp-clean');

// Clean dev release folders build/release 
gulp.task('clean-prod', function () {
	return gulp.src('build/prod', {read: false})
		.pipe(clean());
});

// make build/release/app folder with minified JS & CSS
gulp.task('minify-prod', function() {
  return gulp.src('app/**/**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: false,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('build/prod/app'));
   
});

// copy other files vendor / assets etc to build/release folder 
gulp.task('copy-prod',  function () {
        return gulp.src(['vendor/**/**/*', 'assets/**/**/*','index.html'], {
            base: '.'
        }).pipe(gulp.dest('build/prod'));
    });
	
// perform  release task 
gulp.task('production',['clean-prod','minify-prod','copy-prod'],function() {
	
});	
/*------------- Development tasks --------------------------*/


// Clean dev release folders build/dev
gulp.task('clean-dev', function () {
	return gulp.src('build/dev', {read: false})
		.pipe(clean());
});


gulp.task('minify-dev', function() {
  return gulp.src('app/**/**/*').pipe(minify({
    minify: false,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: false,
    minifyCSS: false,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('build/dev/app'));
   
});

 gulp.task('copy-dev',  function () {
        return gulp.src(['vendor/**/**/*', 'assets/**/**/*','index.html'], {
            base: '.'
        }).pipe(gulp.dest('build/dev'));
    });
	
gulp.task('development',['clean-dev','minify-dev','copy-dev'],function() {
	
});	


gulp.task('build-all',['development','production'],function() {
	
});	


gulp.task('clean-all',['clean-dev','clean-prod'],function() {
	
});	

gulp.task('default',[],function(){});
gulp.task('release', function() {

	if(argv.prod) {
		gulp.start('production');
	}
	else if(argv.dev) {
		gulp.start('development');
	}
	else {
		gulp.start('build-all');

	}

});
