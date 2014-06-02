exports.testOne = function(req, res, next){
	console.log('#testOne');
	next();
};

exports.testTwo = function(req, res, next){
	console.log('#testTwo');
	next();
};

exports.headerTest = function(req, res, next){
	res.set('x-foo', 'bar');
	next();
};