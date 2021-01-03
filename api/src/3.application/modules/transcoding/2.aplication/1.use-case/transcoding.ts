import { IMetada, ISourceData } from "../../3.Domain/entities/IParams";
const transcoding = (source: ISourceData, metadata: IMetada) => {
  const { origin, destiny } = source;
  const { audio, audioFilter, video, videoFilter } = metadata;
  // Filtrar: Reducir el volumen, rellenar el video, cortar el video
  // Transcoding: Convertir el archivo al codec de audio y video respectivo
  // Repetir el proceso
};

export default {
  transcoding,
};
