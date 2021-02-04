import { predefined } from ".";
import { IMetadata, IParams } from "../../share/3.domain";
import transcodingRouter from "../1.adapter/routes/transcoding";
import normalizeVolume from "./normalizeVolume";

const transcoder = async (params: IParams) => {
  console.log("Ingresando");
  const {
    metadata: { general },
  } = params;
  let transcoding;
  try {
    let source = params;
    const pathArray = params.destiny.split("/");
    let fieldName = pathArray.pop();
    const pathDestiny = pathArray.join("/");
    console.log(fieldName, pathDestiny);

    // const { origin, destiny } = source;
    const normalizedAuidoPath = await normalizeVolume(source, {
      destiny: pathDestiny + `/temp/normalize.${fieldName}`,
    });

    // const transcoding = predefined["preAjust"];
    // const { audio, audioFilter, video, videoFilter } = metadata;
    // Filtrar: Mapear y ejecutar cada filtro seleccionado
    // Transcoding: Convertir el archivo al codec de audio y video respectivo
    // Repetir el proceso si existen más datos
    return { data: source.destiny };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

export default transcoder;
