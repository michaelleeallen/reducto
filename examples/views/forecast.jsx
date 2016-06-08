var React = require("react");

const ForecastItem = (props) => {
  var dtText = new Date(props.dt_txt).toDateString();
  return (
    <article key={props.dt}>
      {dtText} - {props.main.temp}&deg; - {props.weather.map(w => <span>{w.main}</span>)}
    </article>
  );
};

module.exports = React.createClass({

  displayName: 'Forecast',

  propTypes: {
    title: React.PropTypes.string,
    forecast: React.PropTypes.arrayOf(React.PropTypes.object)
  },
  
  getDefaultProps() {
    return {item: {}};
  },

  render: function(){
    return (
      <article className="forecast">
        <header>
          <h3>{this.props.title}</h3>
        </header>
        {this.props.forecast.map(f => ForecastItem(f))}
      </article>
    );
  }
});
