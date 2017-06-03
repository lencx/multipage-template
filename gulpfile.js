const gulp = require('gulp')
const uglify = require('gulp-uglify')
const pump = require('pump')
const babel = require('gulp-babel')

gulp.task('default', () => {
    return pump([
        gulp.src('./static/js/event.js'),
        babel({
            presets: ['env']
        }),
        uglify(),
        gulp.dest('./static/dist')
    ])
})