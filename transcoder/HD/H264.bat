ffmbc -i Original.mov -r 29.97  -vcodec libx264  -pix_fmt yuv420p -color_primaries bt709  -tune film -preset slow -profile baseline -crf 6  -acodec pcm_s16le    -timecode 00:00:00:00 -y H264/h264.mov
pause