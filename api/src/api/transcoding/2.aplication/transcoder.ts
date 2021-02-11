import { predefined } from ".";
import { IMetadata, IParams, paramsService } from "../../share/3.domain";
import transcodingRouter from "../1.adapter/routes/transcoding";
import normalizeVolume from "./normalizeVolume";

const transcoder = async (params: IParams) => {
  const {
    metadata: { general },
  } = params;
  let transcoding;
  try {
    let source = params;
    const { basename, dirname, extension } = paramsService.getPropPath(
      params.destiny
    );

    // const { origin, destiny } = source;
    const normalizedAuidoPath = await normalizeVolume(source, {
      destiny: dirname + `/temp/normalize.${basename}${extension}`,
    });
    // const transcoding = predefined["preAjust"];
    // const { audio, audioFilter, video, videoFilter } = metadata;
    // Filtrar: Mapear y ejecutar cada filtro seleccionado
    // Transcoding: Convertir el archivo al codec de audio y video respectivo
    // Repetir el proceso si existen más datos
    return source.destiny;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

export default transcoder;
