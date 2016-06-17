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
  name: "GET:weather",
  dataSchema: {
    weather: "query.results.channel"
  }
};

module.exports = {
  CONFIG,
  SERVICES,
  RESPONSE
};