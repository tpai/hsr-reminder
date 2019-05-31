const stations = [
  { key: 1, value: '南港' },
  { key: 2, value: '台北' },
  { key: 3, value: '板橋' },
  { key: 4, value: '桃園' },
  { key: 5, value: '新竹' },
  { key: 6, value: '苗栗' },
  { key: 7, value: '台中' },
  { key: 8, value: '彰化' },
  { key: 9, value: '雲林' },
  { key: 10, value: '嘉義' },
  { key: 11, value: '台南' },
  { key: 12, value: '左營' },
];

const utils = {
  getStationById: function (id) { return stations.find(station => station.key === id).value; },
  createFormattedStrings: function (data) {
    return data.reduce(function (result, val, key) {
      const dept = utils.getStationById(Number(val.deptStation));
      const dest = utils.getStationById(Number(val.destStation));
      const date = val.deptDateTime.match(/\d{4}-\d{2}-\d{2}/g).join('');
      const deptTime = val.deptDateTime.match(/\d{2}:\d{2}:\d{2}/g).join('');
      const arrivalTime = val.arrivalDateTime.match(/\d{2}:\d{2}:\d{2}/g).join('');
      return {
        ...result,
        [`value${key+1}`]: `[${val.trainNumber},${dept}-${dest},${date},${deptTime}-${arrivalTime}]`,
      };
    }, {});
  },
};

module.exports = utils;
