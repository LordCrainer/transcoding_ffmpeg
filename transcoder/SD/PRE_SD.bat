ffmbc -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\Original.mov" -r 29.97  -threads 1 -y  -bff -flags +alt+ilme+ildct  -vf scale=720:486:interl=1,pad=720:576:0:72:black:aspect=4:3 -b 50M -minrate 50M -maxrate 50M -bufsize 8M -pix_fmt yuv420p -crf 6  -timecode 00:00:00:00 -ar 48000  -acodec pcm_s16le -metadata encoder="DVCPROHD" -y "pre_sd.mov"
pause