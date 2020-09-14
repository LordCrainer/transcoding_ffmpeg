/**
 * PROGRESS EVENT FOR STREAM DATA
 * @param {NodeJS.ReadableStream | Buffer} inputStream
 * @param {Number} size
 * @param {function(Number):Number} callback - progress: number
 */
const progressEvent = (inputStream, { size }, callback = () => {}) =>
  new Promise((resolve, reject) => {
    let uploadedSize = 0;
    inputStream.on("data", (buffer) => {
      let segmentLength = buffer.length;
      uploadedSize += segmentLength;
      let progress = ((uploadedSize / size) * 100).toFixed(2);
      callback(progress);
    });
    resolve("END PROGRESS");
  });

module.exports = {
  progressEvent,
};
