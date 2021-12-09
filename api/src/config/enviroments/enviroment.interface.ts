export interface Enviroments {
  dataBase: {
    mongo: Mongo;
  };
  server: Server;
  multer: Multer;
  cors: Cors;
  secret: string;
}

type Mongo = {
  url: string;
};

type Server = {
  host: string;
  port: Number | string;
};

interface Multer {
  destiny: string;
  fileSize: number;
}

interface Cors {
  origin: string;
  optionsSuccessStatus: number;
}
