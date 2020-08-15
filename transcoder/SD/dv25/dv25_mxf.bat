ffmbc -i "%1"  -target dvcpro  -preset slow -crf 6   -ar 48000 -acodec pcm_s16le -ac 2 -y "%1_dv.mov"
pause