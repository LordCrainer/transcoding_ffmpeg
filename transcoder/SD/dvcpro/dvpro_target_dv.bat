ffmpeg -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\SD\pre_sd_win.mov" -r 29.970 -s 720x576 -pix_fmt yuv420p   -b 25M -minrate 25M -maxrate 25M -bufsize 4M -acodec copy -ac 1 -timecode 00:00:00:00 -y "prueba_dvcpro_v2.dv"

pause