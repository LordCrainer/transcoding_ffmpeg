ffmbc -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\SD\pre_sd.mov" -pix_fmt yuv411p   -preset slow -bff  -ar 48000 -acodec pcm_s16le -ac 2 -timecode 00:00:00:00  -y "prueba_dv25_v1.mov"
pause
ffmpeg -i "prueba_dv25_v1.dv" -vcodec copy -acodec copy -y "prueba_dv25_v1.mxf"
pause