var MyReactBootstrapButton = React.createClass({
render: function() {

    var ButtonGroup = ReactBootstrap.ButtonGroup;
    var Button  = ReactBootstrap.Button;

    return (<div>
                <ButtonGroup>
                    <Button>Left</Button>
                    <Button>Middle</Button>
                    <Button>Right</Button>
                </ButtonGroup>
            </div>);
    }
});

ReactDOM.render(<MyReactBootstrapButton />, document.getElementById("container"));
