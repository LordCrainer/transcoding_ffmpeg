ffmbc -i %1 -r 29.97  -vcodec libx264  -pix_fmt yuv420p -color_primaries bt709 -b 15M -minrate 15M -maxrate 15M -bufsize 4M -tune film -preset slow -profile baseline -crf 6  -acodec pcm_s24le    -timecode 00:00:00:00 -y "%n~1.mov"
pause

ffmpeg -i %1 -r 29.97 -c:v libx264 -b:v 50M -maxrate 50M -minrate 50M -bufsize 4M -crf 2 -preset:v slow -c:a pcm_s16le "CLARO GAMER TACTICO PPA �10 20 SEG.mp4"