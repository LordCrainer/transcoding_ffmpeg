ffmpeg -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\Original.mov" -pix_fmt yuv422p -vcodec mpeg2video -vtag xd5c -b:v 50000k -maxrate 50000k -bufsize 3835k -minrate 50000k -flags ilme -top 1  -r 29.970   -y -shortest "prueba_HD_v4.mov"