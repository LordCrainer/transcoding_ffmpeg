ffmbc -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\SD\pre_sd_sd.mov"  -r 29.970 -aspect 3:2 -bff -target dvcpro  -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -acodec pcm_s16le -sample_fmt s16  -y "prueba_dv_v3_sd.mov"
pause