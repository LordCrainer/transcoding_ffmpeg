import { IMetadata, IParams } from "../../share/3.domain";
import transcodingRouter from "../1.adapter/routes/transcoding";

const transcoder = async (params: IParams) => {
  console.log("Ingresando");
  try {
    // const { origin, destiny } = source;
    console.log("USE CASE: ", params);
    
    // const { audio, audioFilter, video, videoFilter } = metadata;
    // Filtrar: Mapear y ejecutar cada filtro seleccionado
    // Transcoding: Convertir el archivo al codec de audio y video respectivo
    // Repetir el proceso si existen más datos
    return { data: "salida" };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

export default transcoder;
