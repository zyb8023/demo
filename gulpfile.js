let gulp = require("gulp");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let sass = require("gulp-sass");
let clean = require("gulp-clean-css");
let webserver = require("gulp-webserver");

//js的编译，压缩，转移
gulp.task("buildJS", () => {
	gulp.src("./src/*/*.js")
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/scripts"));

	gulp.src("./src/scripts/libs/*.js")
		.pipe(gulp.dest("./dist/scripts/libs"));
});
//cs的编译，压缩，转移
gulp.task("buildCSS", () => {
	gulp.src("./src/styles/*.scss")
		.pipe(sass())
		.pipe(clean())
		.pipe(gulp.dest("./dist/styles"));
});
//html的编译，压缩，转移
gulp.task("buildHtml", () => {
	gulp.src("./src/pages/*.html").pipe(gulp.dest("./dist/pages"))
});

//监听
gulp.task("watching", () => {
	gulp.watch("./src/**/*.html", ["buildHtml"]);
	gulp.watch("./src/**/*.js", ["buildJS"]);
	gulp.watch("./src/**/*.scss", ["buildCSS"]);
});

//服务器
gulp.task("webserver", ["watching"], () => {
	gulp.src("dist")
		.pipe(webserver({
			livereload: true, //是否支持热部署
			https: true,
			proxies: [{
				source: '/abcdefg',
				target: 'https://m.lagou.com/listmore.json?pageNo=2&pageSize=15',
			}]
		}));

});

gulp.task("build", ["buildJS", "buildCSS", "buildHtml"]);