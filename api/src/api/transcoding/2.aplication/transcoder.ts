import { predefined } from ".";
import { IMetadata, IParams, paramsService } from "../../params";
import transcodingRouter from "../1.adapter/routes";
import volume from "./volume";

const oneTranscoding = async (params: IParams) => {
  const {
    metadata: { general },
  } = params;
  let transcoding;
  try {
    const { basename, dirname, extension } = paramsService.getPropPath(
      params.destiny
    );

    let tempSource = { ...params };
    tempSource.destiny = `./data/temp/normalize.${basename}`;
    const normalizedAuido = await volume.normalizeVolume(tempSource);
    console.log(normalizedAuido);
    tempSource.origin = normalizedAuido.destiny;
    tempSource.destiny = params.origin;

    const selected = await predefined.listPredefined(general.profile);
    const transcoding = await selected(tempSource);
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
