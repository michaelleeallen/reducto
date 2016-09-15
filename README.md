# Reducto
[![Build Status](https://travis-ci.org/michaelleeallen/reducto.png)](https://travis-ci.org/michaelleeallen/reducto) [![Code Climate](https://codeclimate.com/github/michaelleeallen/reducto/badges/gpa.svg)](https://codeclimate.com/github/michaelleeallen/reducto) [![devDependency Status](https://david-dm.org/michaelleeallen/reducto.svg)](https://david-dm.org/michaelleeallen/reducto)

A lightweight configuration framework for express.js that aims to simplify creating API endpoints with
a distributed back-end. Reducto acts as an aggregator that allows you to declare routes and services in a straighforward,
easy-to-scan way.




## Installation
Reducto only provides configuration for express, so you will need to install express along with reducto:

	npm install reducto express --save

## Project Setup

You must provide both a routes and services config to reducto along with your express app, and reducto then parses your configuration and builds your express routes with all the configured middleware.

```javascript
const express = require('express');
const reducto = require('reducto');
const app = express();
const routes = require('your_route_config.json');
const services = require('your_services_config.json');

reducto(app, routes, services);

app.listen(3000);
```

## Routes

The route configuration file lets you declare what endpoints you expose and what those endpoints do.
Routes can be configured to use middleware, views, fixtures and service calls. Middlware should be added in the order you want them to run.

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
the HTTP methods per route. Each method has its own list of middleware configurations. These configurations are used to construct the middleware that is added to your express route.

### Middleware Configuration Types

#### middleware

##### path
The path to the middleware file(with optional function name as *file.js#myFuncName*), or the name of any 3rd-party express middleware.

#### service

##### name
The name of service endpoint from your services config file.

##### dataKey
An optional key where all returned data will be stored in the response.

##### dataSchema
An optional schema to map returned data to.

##### context
An optional context for value replacement.

#### batch

##### services
A list of service middleware configurations that will be called as an asynchronous batch.

#### iterator

##### key
The data key to pull list from.

#### filter

##### dataPath
The object path to search for list to filter.

##### key
The key to filter on.

##### value
The value to filter by.

##### service
The configuration for the service to call.

#### fixture

##### data
A JSON object containing static data. This data is added to the cumulative `res.locals` object.

#### view

##### name
The name of a view to render with `res.render`. You must provide express with a rendering engine for this to work. See examples.


## Services

Services, or rather, service calls, represent any callable HTTP endpoint.

**NOTE:** headers may contain the string `FROM_REQUEST` in order to pass header values from the request to the underlying service call.

```json
{
  "myEndpoint": {
    "GET": {
      "uri": "http://myws.com/api/someresource/{id}",
      "headers": {
        "Accepts": "application/xml",
        "Authorization": "FROM_REQUEST"
      }
    },
    "POST": {
      "uri": "http://myws.com/api/someresource"
    }
  }
}
```

The route config is using the express routing mechanism for parameters: `/my/route/:id`. This data can then be used in our service calls by
placing a corresponding URI token in the service definition: `http://myws.com/api/someresource/{id}` where `{id}`
will map to `:id`. Query params, routes params, request body, and data returned from previous service calls can all be used to pass data to the service call.

Service calls use the [request](https://github.com/mikeal/request) module to handle HTTP, so any valid configuration for
**request** applies here.

#### Additional Service configuration

##### bodySchema
An optional JSON schema that describes the request body to send to the service call. Paths are specified according to [pathval](https://github.com/chaijs/pathval).
```json
{
  "bodySchema": {
    "foo": "data.content.foo",
    "bar": "data.content.bars[0]"
  }
}
```

## Examples

Navigate to the root directory and run `npm start`. This will start the example app at
`http://localhost:3000`. You can view the example page by pointing your browser to `http://localhost:3000/local/:zipcode`
where `:zipcode` is any valid zip. All example code can be found in the `/examples` directory.
