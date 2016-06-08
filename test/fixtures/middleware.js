exports.testOne = function(req, res, next) {
  console.log('#testOne');
  next();
};

exports.testTwo = function(req, res, next) {
  console.log('#testTwo');
  next();
};

exports.headerTest = function(req, res, next) {
  res.set('x-foo', 'bar');
  next();
};

exports.auth = function(req, res, next) {
  var authorization = req.get('Authorization');
  if (authorization) {
    next();
  } else {
    res.send(401);
  }
}