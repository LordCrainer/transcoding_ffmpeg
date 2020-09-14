const fs = require("mz/fs");

const createReadStream = async (path, options) => {
  return new Promise((resolve, reject) => {
    let streamFile = fs.createReadStream(path, options).on("error", (err) => {
      error(`ERROR_MISCELANEAS_FS_CREATEREADSTREAM: ${err.code}${err.path}\n`);
      reject({ code: err.code, path: err.path });
    });
    resolve(streamFile);
  });
};

const statSync = async (path, options) => {
  return new Promise((resolve, reject) => {
    let stats = fs.statSync(path, options);
    if (Object.keys(stats).length === 0 && stats.constructor === Object) {
      reject(new Error("ERROR_FS_STATSNC"));
    }
    resolve(stats);
  });
};

module.exports = {
  createReadStream,
  statSync,
};
