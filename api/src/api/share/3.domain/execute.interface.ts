export interface IProgram {
  application: string;
  args: Array<string>;
}

export interface ISpawnCallBack {
  (output?: string): string;
}
