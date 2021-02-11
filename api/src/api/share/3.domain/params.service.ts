import path from "path";
const getPropPath = (pathString: string) => ({
  basename: path.basename(pathString),
  extension: path.extname(pathString),
  dirname: path.dirname(pathString),
});

export default { getPropPath };
