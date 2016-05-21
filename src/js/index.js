var HelloWorld = React.createClass({
	render: function() {
		return (
			<h1>Hello {this.props.world}</h1>
		);
	}
});

ReactDOM.render(<HelloWorld world="World!!!" />, document.getElementById('container'));