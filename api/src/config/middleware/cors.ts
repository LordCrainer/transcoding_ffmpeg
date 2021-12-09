import enviroments from "../enviroments";
import cors from "cors";

const set = () => {
  return cors(enviroments.cors);
};

export default { set };
