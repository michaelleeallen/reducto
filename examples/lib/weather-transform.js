module.exports = function(data){
  data.weather = data.query.results.channel;
  delete data.query;
  return data;
};
