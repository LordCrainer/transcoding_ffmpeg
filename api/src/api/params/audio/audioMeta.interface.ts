export interface IAudioMeta {
  codec?: codec;
  skip?: boolean,
  format?: string;
  frameRate?: frameRate;
  bitRate?: string;
  channels?: {
    value?: number;
    type?: "stereo" | "mono";
    custom?: Object;
  };
  discreteTracks?: {
    value?: "2" | "3" | "4";
    same?: false;
  };
  bitDepth?: "16" | "24";
}
type frameRate = "48000" | "44100";
type codec =
  | "aac"
  | "flac"
  | "mp3"
  | "pcm_s16le"
  | "pcm_s24le"
  | "pcm_s32le"
  | "opus";
