import { IMetadata } from "api/params";

type processSlugs =
  | "normalizeVolume"
  | "pad"
  | "xdcamHD"
  | "h264"
  | "dvcpro"
  | "dnxhd"
  | "pad"
  | "ftp"
  | "file"
  | "copy";

type ProcessType = "input" | "output" | "decoder" | "encoder" | "filter";

type Programs = "ffmbc" | "ffmpeg" | "shell" | "bash";

type Tags = "filter" | "encoder" | "decoder" | "output" | "input";

export interface Process {
  id?: String | Number;
  title: String;
  slug: processSlugs;
  type: ProcessType;
  hash?: String;
  program: Programs;
  metadata?: IMetadata[];
  tags?: Tags[];
}
