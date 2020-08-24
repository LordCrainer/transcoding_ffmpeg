ffmpeg -i input.y4m -i left.flac -i right.flac -s 720x576 -r 25 -pix_fmt 
yuv420p -target dv output.mxf