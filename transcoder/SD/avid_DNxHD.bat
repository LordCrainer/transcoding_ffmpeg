ffmpeg -i "%1" -c:v dnxhd -profile:v 3 -vf scale=720:486:interl=1,pad=720:576:100:72:black:aspect=4:3 -c:a pcm_s24le -y "%1_AVID.mov"
pause