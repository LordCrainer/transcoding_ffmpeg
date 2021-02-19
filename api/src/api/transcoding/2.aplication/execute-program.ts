import { execute } from "api/share/2.application";
import { ICustomConfig } from "api/share/3.domain";

const executeProgram = async (params: ICustomConfig) => {
  try {
    const command = `${params.program} -i ${params.origin} ${params.commands} ${params.destiny}`;
    return await execute.commands(command, /\s+/)();
  } catch (error) {
    throw new Error(error);
  }
};

export default executeProgram;
