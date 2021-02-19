import path from "path";
const handleData = (file: Express.Multer.File) => {
  try {
    const origin = file.destination + file.originalname;
    const sizefile = file.size;
    return { origin, sizefile };
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  handleData,
};
