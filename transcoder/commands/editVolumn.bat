ffmpeg -i %1 -dcodec copy  -vcodec copy  -af volume=-6dB -metadata encoder="XDCAM"  -map_metadata -1  -dn -y "%1_12.mxf" -acodec copy 
pause