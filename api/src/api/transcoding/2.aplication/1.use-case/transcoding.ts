import { IMetada, ISourceData } from "../../3.Domain/entities/IParams";

const transcoding = async (source: ISourceData, metadata: IMetada) => {
  console.log("Ingresando");
  try {

    const { origin, destiny } = source;
    console.log(origin, destiny);

    // const { audio, audioFilter, video, videoFilter } = metadata;
    // Filtrar: Reducir el volumen, rellenar el video, cortar el video
    // Transcoding: Convertir el archivo al codec de audio y video respectivo
    // Repetir el proceso
    return { origin, destiny };
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  transcoding,
};
