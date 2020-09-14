const getMaxAndMean = (data) => {
  let [, max] = data.match(/max_volume:\s(-?[0-9]\d*\.\d+)/);
  let [, mean] = data.match(/mean_volume:\s(-?[0-9]\d*\.\d+)/);
  return { max, mean };
};

module.exports = {
  getMaxAndMean,
};
