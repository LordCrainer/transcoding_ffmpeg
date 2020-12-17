export interface IProgram {
  application: string;
  arguments: Array<string>;
}

export interface ISpawnCallBack {
  (output: string): string;
}
