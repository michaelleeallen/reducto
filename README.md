# Reducto [![Build Status](https://travis-ci.org/michaelleeallen/reducto.png)](https://travis-ci.org/michaelleeallen/reducto)

A lightweight configuration framework for express.js that aims to simplify creating routes and APIs for apps with
a distributed back-end.

The main concept behind reducto is to configure your app of smaller, easily understood pieces of code that are testable
, composable and reusable across your app. This should reduce the amount of boilerplate code that you have
to write and test for thus making your app more robust and easier to maintain.

## Installation

	npm install reducto

## Project Setup

Reducto only provides configuration for express, so you will need to include express
yourself:

	npm install express --save

Other than express the only real requirement is that you provide some JSON configuration
for your routes and/or service calls, and that you provide a middleware function to handle
the response for your routes:
```javascript
var express = require('express');
var reducto = require('reducto');
var app = express();
// NOTE: the follwing could be contained in the same file
var routes = require('your_route_config.json');
var services = require('your_services_config.json');

// maybe some pre-processing middleware...
reducto(app, routes, services);
// maybe some post-processing middleware...
// your middleware that finally handles the response...

app.listen(3000);
```
All of the data collected by reducto will be placed in `res.locals`, so your response-handling
middleware should look there:
```javascript
//...
res.render('mytemplate', res.locals);
//... or ...
res.json(res.locals);
```

## Route configuration

Routes can be configured to use middleware, fixtures and service calls. Each piece is optional:
```json
{
  "/my/route/:id": {
    "get": {
      "middleware": ["lib/middleware.js#myFunc"],
      "services": ["myRESTfulEndpoint"],
      "fixture": {
        "title": "My awesome page title"
      }
    },
    "post": {
      "services": ["post:myRESTfulEndpoint"]
    }
  }
}
```
Each route is defined by its URI pattern. This can be any legal express route pattern. Next you define
the HTTP methods per route. Each method can have its own configuration. The config options are:
- `middleware` is a list of middleware functions to call, called in sequential order.
- `services` is a list of service configuration keys, called in sequential order.
- `fixture` is any valid JSON data to include with the routes collected data

## Service configuration

Services, or rather, service calls, represent any callable HTTP endpoint. Right now only RESTful enpoints that
consume and return JSON are supported.
```json
{
  "myRESTfulEndpoint": {
    "get": {
      "uri": "http://myws.com/api/someresource/{id}",
      "headers": {
        "api-key": "adlfplkjf09123lkj32lkj3"
      },
      "transform": "path/to/my/transform.js#someMethod"
    },
    "post": {
      "uri": "http://myws.com/api/someresource"
    }
  }
}
```
Note that the route config is using
the express routing mechanism for parameters: `/my/route/:id`. This data can then be used in our service calls by
placing a corresponding URI token in the service definition: `http://myws.com/api/someresource/{id}` where `{id}`
will map to `:id`.

Service calls use [mikeal's](https://github.com/mikeal) [request](https://github.com/mikeal/request) module to handle HTTP, so any valid configuration for
**request** applies here. The `transform` key refers to any module/method that accepts JSON as input and produces JSON as output:
```javascript
module.exports = function(data){
  // do some modification on data ...
  return data;
};
```
These are great for when you need the data in a different format than what the service(which you may have no control over) provides.

## Running the example application

Navigate to the root directory and run `npm start`. This will start the example app at
`http://localhost:3000`. You can view the example page by pointing your browser to `localhost:3000/weahter/:zipcode`
where `:zipcode` is any valid zip. The resulting page should show you the weather for that zipcode.
