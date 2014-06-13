exports.foo = function(data){
  data.foo = 'bar';
  return data;
};

exports.bar = function(data){
  data.bar = 'foo';
  return data;
};