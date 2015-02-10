var React = require("react");

module.exports = React.createClass({

  displayName: 'Forecast',

  propTypes: {
    title: React.PropTypes.string,
    link: React.PropTypes.string,
    item: React.PropTypes.shape({
      description: React.PropTypes.string
    })
  },

  render: function(){
    return (
      <article className="forecast">
        <header>
          <a href={this.props.link}>{this.props.title}</a>
        </header>
        <section className="body" dangerouslySetInnerHTML={{__html: this.props.item.description}}/>
      </article>
    );
  }
});
