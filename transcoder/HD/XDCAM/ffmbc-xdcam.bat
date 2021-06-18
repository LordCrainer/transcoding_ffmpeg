ffmbc -i testfile.mov -r 29.97 -target xdcamhd422 -vtag xd5c  -b 50M -minrate 50M -maxrate 50M -bufsize 8M -metadata encoder="XDCAMHD422" -ac 1  -timecode 00:00:00:00 -y "PRUEBA_HD_v3.mxf"

ffmbc -i testfile.mov -r 29.97 -target xdcamhd422 -vtag xd5c -acodec pcm_s24le  -y "PRUEBA_HD_V3.1.mxf"  -ab 1500 -ar 48000 -acodec pcm_s24le -ac 1 -newaudio -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00

ffmpeg -i input.mpg -vcodec mpeg2video -s 1920x1080 -b:v 50000k -maxrate 50000k -bufsize 3835k -minrate 50000k -r 25 -flags ilme -top 1 -acodec pcm_s24le -ar 48000 -pix_fmt yuv422p -profile:v 0 -level:v 2  output.mxf

ffmpeg -i "" -vcodec mpeg2video -r 29.97 -s 1920x1080 -b:v 50000k -maxrate 50000k -bufsize 3835k -minrate 50000k  -flags ilme -top 1 -acodec pcm_s24le -ar 48000 -pix_fmt yuv422p -profile:v 0 -level:v 2 -ac 2 -map 0:v -map 0:a -y ""

ffmpeg -i data -pix_fmt yuv422p -vcodec mpeg2video -vtag xd5c -bsf:v h264_metadata=video_format=4 -b:v 50000k  -maxrate 50000k -bufsize 3835k -minrate 50000k -flags ilme -top 1  -r 29.970   -ac 2 -y "out.mxf"


-vf tinterlace=4 -flags +ildct+ilme -top 1



:: FFMPEG .MOV
ffmpeg -i testfile.mov -pix_fmt yuv422p -vcodec mpeg2video -vtag xd5c -b:v 50000k -maxrate 50000k -bufsize 3835k -minrate 50000k -flags ilme -top 1  -r 29.970   -y -shortest "prueba_HD_v4.mov"

ffmpeg -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\Original.mov" -pix_fmt yuv422p -vcodec mpeg2video -vtag xd5c -b:v 50000k -maxrate 50000k -bufsize 3835k -minrate 50000k -flags ilme -top 1  -r 29.970   -ac 2 -y -shortest  "prueba_HD_v4.mov"




