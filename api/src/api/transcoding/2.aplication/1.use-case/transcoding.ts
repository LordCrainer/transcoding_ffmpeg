import { IMetada, ISourceData } from "../../3.Domain/entities/IParams";
import transcodingRouter from "./../../1.infraestructure/routes/transcoding";

const transcoding = async (source: ISourceData, metadata: IMetada) => {
  console.log("Ingresando");
  try {
    // const { origin, destiny } = source;
    console.log("USE CASE: ", source);

    // const { audio, audioFilter, video, videoFilter } = metadata;
    // Filtrar: Reducir el volumen, rellenar el video, cortar el video
    // Transcoding: Convertir el archivo al codec de audio y video respectivo
    // Repetir el proceso
    return { data: "salida" };
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const suma = (a: number, b: number) => {
  return a + b;
};

export default { suma, transcoding };
