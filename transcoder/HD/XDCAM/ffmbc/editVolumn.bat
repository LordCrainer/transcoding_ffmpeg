:: ffmpeg -i %1 -dcodec copy  -vcodec copy  -af volume=-12dB  -map_metadata -1 -acodec copy -dn -y "sd.%~n1.mov" 
ffmpeg -i %1 -vcodec copy  -af volume=-12dB -acodec pcm_s16le -y "sd.%~n1.mov" 

pause