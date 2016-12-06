# Require any additional compass plugins here.
require 'compass'
require 'susy'
require 'sass-globbing'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
javascripts_dir = "js"
fonts_dir = "fonts"

relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

preferred_syntax = :sass

# Add cache buster
asset_cache_buster :none
output_style = :expanded
sprite_engine = :chunky_png
chunky_png_options = {:best_compression  => Zlib::BEST_COMPRESSION}

#sass_options = {:debug_info => true}
sourcemap = true
