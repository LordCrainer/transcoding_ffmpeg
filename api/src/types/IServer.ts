export interface IexpressConfig {
  cors: {
    origin: string;
    optionsSuccessStatus: number;
  };
  morgan: string;
}
