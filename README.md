# Reducto
[![Build Status](https://travis-ci.org/michaelleeallen/reducto.png)](https://travis-ci.org/michaelleeallen/reducto)

[![devDependency Status](https://david-dm.org/michaelleeallen/reducto.svg)](https://david-dm.org/michaelleeallen/reducto)

A lightweight configuration framework for express.js that aims to simplify creating routes and APIs for apps with
a distributed back-end.

The main goal of reducto is to break apart the routing mechanism into smaller, more cohesive components. By reducing your app to middleware, data transforms, and reusable service calls you end up with a smaller set of code to reason about and thus make your app easier to write and maintain.


## Installation

	npm install reducto

## Project Setup

Reducto only provides configuration for express, so you will need to include express
yourself:

	npm install express --save

You must include a routes config that defines how to construct your app(see below). A services config is optional, but useful for connecting to distributed APIs.

```javascript
var express = require('express');
var reducto = require('reducto');
var app = express();
var routes = require('your_route_config.json');
var services = require('your_services_config.json');

reducto(app, routes, services);

app.listen(3000);
```

## Routes

Routes can be configured to use middleware, views, fixtures and service calls. Each piece is optional, and should be added in the order you want them to run:

```json
{
  "/my/route/:id": {
    "GET": [
      { "type": "middleware", "path": "./lib/middleware.js#myFuncName" },
      { "type": "service", "name": "GET:myEndpoint" },
      { "type": "fixture", "data": {
        "title": "My awesome page title"
      }},
      { "type": "view", "name": "my-view" }
    ],
    "POST": [
      { "type": "service", "name": "POST:myEndpoint" },
      { "type": "transform", "path": "./lib/my-post-transform.js" }
    ]
  }
}
```

Each route is defined by its URI pattern. This can be any legal express route pattern. Next you define
the HTTP methods per route. Each method has its own list of configurations.

### middleware

#### path
The file path to the middleware file(with optional function name as *file.js#myFuncName*), or the name of any 3rd-party express middleware

### service

#### name
The name of service endpoint from your services config file.

### transform

#### path
The file path to the transform function(with optional function name as *file.js#myFuncName*).

### fixture

#### data
A JSON object containing static data. This data is added to the cumulative `res.locals` object.

### view

#### name
The name of a view to render with `res.render`. You must provide express with a rendering engine for this to work. See examples.


## Services

Services, or rather, service calls, represent any callable HTTP endpoint. Right now only RESTful enpoints are supported.
```json
{
  "myEndpoint": {
    "GET": {
      "uri": "http://myws.com/api/someresource/{id}",
      "headers": {
        "api-key": "adlfplkjf09123lkj32lkj3"
      }
    },
    "POST": {
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
**request** applies here.

## Data Transforms
Transforms are any module/method that accepts JSON as input and produces JSON as output. Transforms will be passed in the cumulative `res.locals` object.

```javascript
module.exports = function(data){
  // do some modification on data ...
  return data;
};
```
These are great for when you need the data in a different format than what the service(which you may have no control over) provides.

## Examples

Navigate to the root directory and run `npm start`. This will start the example app at
`http://localhost:3000`. You can view the example page by pointing your browser to `http://localhost:3000/weather/:zipcode`
where `:zipcode` is any valid zip. The resulting page should show you the weather for that zipcode.
