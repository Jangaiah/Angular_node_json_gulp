//gulp file
var gulp = require("gulp"),
	sass = require("gulp-ruby-sass"),
	connect = require("gulp-connect"),
	browserify=require("browserify"),
	source = require("vinyl-source-stream");
	compress = require("node-minify"),
	livereload = require("gulp-livereload");
///setting access to w3schools only, setting '*' will give to all origins
var cors= function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://www.w3schools.com');
  //res.setHeader('Access-Control-Allow-Headers', 'www.w3schools.com');
  next();
};

//combining javascript files
gulp.task('browserify',function(){
	return browserify('./app/app.js')
	.bundle()
	.pipe(source('main.js'))
	.pipe(gulp.dest('./public/js/'))
	.pipe(livereload());

});

//watching task
gulp.task('watch',function(){
	//livereload.listen();
	gulp.watch('app/**/*.js',['browserify']);
	//gulp.watch('sass/style.sass',['sass']);
});

//Creating and running server
gulp.task('connect',function(){
	connect.server({
		root:'public',
		port:1111,
		middleware: function () {
      		return [cors];
    	}
	});
});

//minifying js file
gulp.task('compress',function(){
	compress.minify({
		compressor:'uglifyjs',
		input:'./public/js/main.js',
		output:'./public/js/main-min.js',
		callback:function(err,min){}
	});
});

gulp.task('sass',function(){
	return sass('sass/style.sass').pipe(gulp.dest('public/css'));
});

//Making defaults
gulp.task('default',['connect','browserify','watch']);