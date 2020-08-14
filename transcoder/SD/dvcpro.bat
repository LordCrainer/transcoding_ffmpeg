ffmbc -i "%1"  -aspect 3:2  -target dvcpro  -b 50M -minrate 50M -maxrate 50M -bufsize 8M -acodec pcm_s16le -y "%1_dv.mov"
pause