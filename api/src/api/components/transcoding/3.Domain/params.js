class audioFilter {
  constructor(volume) {
    this.volume = volume;
  }
}

class videoFilter {
  constructor(padding, codec) {
    this.codec = codec;
    this.padding = padding;
  }
}

class audio {
  constructor(codec) {
    this.codec = codec;
  }
}

class params {
  constructor() {}
}

const params = {
  audioFilter: {
    threshold: -12,
  },
  videoFilter: {
    padding: "72:50",
  },
  audio: {
    codec: "sl16",
    channel: 2,
  },
  video: {
    codec: "DVCPRO",
    dimension: "720x576",

  },
  metadata: {
      title: ""
  }
};
