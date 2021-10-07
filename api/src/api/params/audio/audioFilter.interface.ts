export interface IVolume {
  value: number;
  unit: "dB";
}

export interface INormalizeVolume {
  threshold: number;
  marginError?: 1;
  max?: 1;
  min?: 1;
  unit?: "dB";
}

export interface IAudioFilter {
  volume?: IVolume;
  normalizeVolume?: INormalizeVolume;
}
