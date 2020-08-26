ffmpeg -i "%1" -vcodec copy  -af volume=-6dB  -y "%1_12.mxf" -acodec copy
pause