const RESPONSE = {
  query: {
    results: {
      channel: {title: 'Yahoo! Weather - Simpsonville, SC'},
      news: ['A news story']
    }
  }
};

const SERVICES = {
  weather: {
    GET: {
      uri: 'http://example.com/api/weather/{zip}?days={days}'
    }
  },
  news: {
    GET: {
      uri: 'http://example.com/api/news/{zip}'
    }
  }
};

const CONFIG = {
  services: [
    {name: "GET:weather", dataMap: {
      weather: "query.results.channel"
    }},
    {name: 'GET:news', dataMap: {
      news: 'query.results.news'
    }}
  ]
};

module.exports = {
  CONFIG,
  SERVICES,
  RESPONSE
};