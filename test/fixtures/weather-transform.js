module.exports = function(data){  
  data.weather = data.query.results.channel;
  data.query = undefined;
  return data;
};