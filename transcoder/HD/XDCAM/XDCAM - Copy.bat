ffmpeg -i "D:\Documents\Trabajos\LANUBETV\Desarrollo\Transcoding\transcoding_ffmpeg\transcoder\Original.mov" -pix_fmt yuv422p -vcodec mpeg2video -s 1920x1080 -r 29.970 -non_linear_quant 1 -flags +ildct+ilme -top 2 -dc 10 -intra_vlc 1 -qmax 10 -lmin "1*QP2LAMBDA" -vtag xd5c -rc_max_vbv_use 1 -rc_min_vbv_use 1 -g 12 -b:v 50000k -minrate 50000k -maxrate 50000k -bufsize 8000k -acodec pcm_s16le -ar 48000 -bf 2 -ac 2 -y "XDCAM_FFMPEG.mov"