const React = require("react");
const Forecast = require('./forecast');

const byDistance = (a, b) => a.Distance < b.Distance? -1 : a.Distance > b.Distance? 1 : 0;

const PizzaRow = (props) => {
  return (
    <tr>
      <td>{props.Title}</td>
      <td>{props.Address}, {props.City}, {props.State}</td>
      <td>{props.Distance}</td>
    </tr>
  );
}

module.exports = React.createClass({
  displayName: 'Weather',
  propTypes: {
    message: React.PropTypes.string,
    weather: React.PropTypes.object,
    pizza: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  getDefaultProps() {
    return {
      message: '',
      weather: {},
      pizza: []
    }
  },

  render() {
    return (
      <html>
        <head>
          <title>{this.props.message}</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous"/>
        </head>
        <body>
          <div className="container">
            <h1 className="page-header">{this.props.message}</h1>
            <div className="row">
              <div className="col-md-6">
                <h2>Weather</h2>
                <Forecast {...this.props.weather}/>
              </div>
              <div className="col-md-6">
                <h2>Pizza!</h2>
                <table className="table striped">
                  <thead>
                    <tr>
                      <th>Store</th>
                      <th>Location</th>
                      <th>Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.props.pizza.sort(byDistance).map(p => PizzaRow(p))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
});
