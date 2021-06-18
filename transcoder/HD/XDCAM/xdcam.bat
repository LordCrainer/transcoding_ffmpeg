ffmpeg -i "" -vcodec mpeg2video -r 29.97 -s 1920x1080 -b:v 50000k -maxrate 50000k -bufsize 3835k -minrate 50000k  -flags ilme -top 1 -acodec pcm_s24le -ar 48000 -pix_fmt yuv422p -profile:v 0 -level:v 2 -ac 2 -map 0:v -map 0:a -y ""


ffmpeg -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\Original.mov" -pix_fmt yuv422p -vcodec mpeg2video -vtag xd5c -b:v 50000k -maxrate 50000k -bufsize 3835k -minrate 50000k -flags ilme -top 1  -r 29.970   -ac 2 -y -shortest  "prueba_HD_v4.mov"

ffmpeg -i data -pix_fmt yuv422p -vcodec mpeg2video -vtag xd5c -bsf:v h264_metadata=video_format=4 -b:v 50000k  -maxrate 50000k -bufsize 3835k -minrate 50000k -flags ilme -top 1  -r 29.970   -ac 2 -y "out.mxf"