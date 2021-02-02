interface IVolume {
  value: number;
  unit: string;
}

interface INormalizeVolume {
  threshold: number;
  marginError: number;
  max: number;
  min: number;
  unit: string;
}

export interface IAudioFilter {
  volume: IVolume;
  normalizeVolume: INormalizeVolume;
}
