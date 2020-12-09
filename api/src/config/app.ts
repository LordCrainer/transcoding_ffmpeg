import dotenv from "dotenv";
const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const configuration = {
  cors: {
    origin: process.env.CORS_ORIGIN || "localhost",
    optionsSuccessStatus: 200,
  },
  morgan: process.env.NODE_ENV === "production" ? "combined" : "dev",
};

export default configuration;
