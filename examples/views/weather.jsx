var React = require("react");
var Forecast = require('./forecast');

module.exports = React.createClass({
  displayName: 'Weather',
  propTypes: {
    message: React.PropTypes.string,
    weather: React.PropTypes.object
  },
  render: function(){
    return (
      <html>
        <head>
          <title>{this.props.message}</title>
        </head>
        <body>
          <Forecast {...this.props.weather}/>
        </body>
      </html>
    );
  }
});
