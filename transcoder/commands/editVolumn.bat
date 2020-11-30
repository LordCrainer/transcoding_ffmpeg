ffmpeg -i %1 -dcodec copy  -vcodec copy  -af volume=-6dB  -map_metadata -1 -acodec copy -dn -y "%1_sd.mov" 
pause