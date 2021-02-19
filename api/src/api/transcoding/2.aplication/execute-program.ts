import { execute, fpFunctions } from "api/share/2.application";
import { ICustomConfig } from "api/share/3.domain";

const executeProgram = async (params: ICustomConfig) => {
  try {
    const listProgram = ["ffmbc", "ffmpeg"];
    const lowerProgramWord = fpFunctions.lowerCase(params.program);
    const program = fpFunctions.findOneElementList(
      listProgram,
      lowerProgramWord
    );
    const command = `${params.program} -i ${params.origin} ${params.commands} ${params.destiny}`;
    return await execute.commands(command, /\s+/)();
  } catch (error) {
    throw new Error(error);
  }
};

export default executeProgram;
