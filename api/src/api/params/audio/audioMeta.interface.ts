export interface IAudioMeta {
  codec: codec;
  format: string;
  frameRate: frameRate;
  bitRate: string;
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
