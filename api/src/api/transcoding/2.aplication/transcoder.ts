import { predefined } from ".";
import { IMetadata, IParams, paramsService } from "../../share/3.domain";
import transcodingRouter from "../1.adapter/routes";
import normalizeVolume from "./normalizeVolume";

const oneTranscoding = async (params: IParams) => {
  const {
    metadata: { general },
  } = params;
  let transcoding;
  try {
    const { basename, dirname, extension } = paramsService.getPropPath(
      params.destiny
    );

    // const { origin, destiny } = source;
    const normalizedAuido = await normalizeVolume(params, {
      destiny: `./data/temp/normalize.${basename}`,
    });
    console.log(normalizedAuido);

    // const transcoding = await predefined[general.profile];
    // const { audio, audioFilter, video, videoFilter } = metadata;
    // Filtrar: Mapear y ejecutar cada filtro seleccionado
    // Transcoding: Convertir el archivo al codec de audio y video respectivo
    // Repetir el proceso si existen más datos
    return { ...params, ...normalizedAuido };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const exceuteManyTranscoding = async (params: IParams[]) => {
  try {
    const data = await Promise.all(
      [...params].map(async (param) => await oneTranscoding(param))
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  exceuteManyTranscoding,
  oneTranscoding,
};
