var gulp           = require( 'gulp' );
var gutil          = require( 'gulp-util' );

var rename         = require( 'gulp-rename' );
var sketch         = require( 'gulp-sketch' );
var iconfont       = require( 'gulp-iconfont' );
var consolidate    = require( 'gulp-consolidate');


// Configuration:

var SKETCH_FILE = 'icons.sketch';
var LODASH_TEMPLATE = './templates/squint-style.scss';
var FONT_OUTPUT_DIR = './icon-font/';
var ICON_FONT_SCSS_FILENAME = '_icon-font'

var fontName = 'symbols';



// Error handler.

function handleError( err )
{
    console.log( err.toString(  ) );
    gutil.beep;
    this.emit( 'end' );
}



gulp.task( 'symbols', function(  )
{
    gulp.src( SKETCH_FILE )
    .pipe( sketch(
    {
        export: 'artboards',
        formats: 'svg'
    } ) )
    .on( 'error', handleError );
    .pipe( iconfont( { fontName: fontName } ) )
    .on( 'error', handleError );
    .on('codepoints', function( codepoints )
    {
        var options =
        {
            glyphs: codepoints,
            fontName: fontName,
            fontPath: '../icon-font/', // set path to font (from your CSS file if relative)
            className: 's' // set class name in your CSS
        };

        gulp.src( LODASH_TEMPLATE )
        .pipe( consolidate( 'lodash', options ) )
        .pipe( rename( { basename: ICON_FONT_SCSS_FILENAME } ) )
        .pipe( gulp.dest( 'sass/' ) ); // set path to export your CSS

    } )
    .pipe( gulp.dest( FONT_OUTPUT_DIR ) ); // set path to export your fonts
} );
