import path from "path";
const getPropPath = (pathString: string) => ({
  extension: path.extname(pathString),
  basename: path.basename(pathString),
  fieldname: path.basename(pathString, path.extname(pathString)),
  dirname: path.dirname(pathString),
});

export default { getPropPath };
