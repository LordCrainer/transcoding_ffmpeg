ffmbc -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\SD\pre_sd.mov"  -r 29.970 -aspect 3:2  -target dvcpro -bff -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -acodec pcm_s24le  -y "prueba_dv_v1.mxf" -ar 48000 -acodec pcm_s32le -ac 1 -newaudio -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00
pause