ffmpeg -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\SD\pre_sd.mov"  -target ntsc-dv -q:v 0.1  -b:v 30M -minrate 30M -maxrate 30M -bufsize 4M -acodec copy  -timecode 00:00:00:00 -y "prueba_dv_v4.mov"

pause