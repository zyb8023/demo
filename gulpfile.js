let gulp = require("gulp");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let sass = require("gulp-sass");
let clean = require("gulp-clean-css");
let webserver = require("gulp-webserver");

//js的编译，压缩，转移
gulp.task("buildJS", () => {
	gulp.src("./src/scripts/*.js")
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/scripts"));

	gulp.src("./src/scripts/libs/*.js")
		.pipe(gulp.dest("./dist/scripts/libs"));
	
	gulp.src("./src/pages/*.js")
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/pages"));
});
//css的编译，压缩，转移
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

//静态资源的压缩和转移
gulp.task("buildStatciDecoration", () => {
	gulp.src("./src/static/images/*.*")
		.pipe(gulp.dest("./dist/static/images"));
});

//监听
gulp.task("watching", () => {
	gulp.watch("./src/**/*.html", ["buildHtml"]);
	gulp.watch("./src/**/*.js", ["buildJS"]);
	gulp.watch("./src/**/*.scss", ["buildCSS"]);
	gulp.watch("./src/static/images/*.*", ["buildStatciDecoration"]);
});

//服务器
gulp.task("webserver", ["watching"], () => {
	gulp.src("dist")
		.pipe(webserver({
			livereload: true, //是否支持热部署
//			https: true,
		}));

});

gulp.task("build", ["buildJS", "buildCSS", "buildHtml","buildStatciDecoration"]);