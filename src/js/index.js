var RecipeList = React.createClass({
	render: function() {
		var rows = [];
		var Accordion = ReactBootstrap.Accordion;
		var Panel = ReactBootstrap.Panel;
		this.props.recipes.forEach(function(recipe) {
			rows.push(<Panel header={recipe.name} eventKey={recipe.index}><p>Ingredients:</p><br/>{recipe.ingredients}</Panel>);
		});
		return (
			<div>
				<Accordion>{rows}</Accordion>
			</div>
		);
	}
});

var RecipeTable = React.createClass({
	render: function() {
		return (
			<div>
			  <RecipeList recipes={this.props.recipes} />
		  </div>
		);
	}
});

var AccordionPanel = React.createClass({
	render: function() {
		var Accordion = ReactBootstrap.Accordion;
		var Panel = ReactBootstrap.Panel;

		return (
			<div>
			  <Accordion>
			    <Panel header="Peanut Butter Jelly">
			    	Blah blah
			    </Panel>
			    <Panel header="Burrito" >
			      some text here
			    </Panel>
			  </Accordion>
		  </div>
		);
	}
});

var RECIPES = [
	{name: "Peanut Butter Jelly", ingredients: ["Peanut Butter", "Jelly", "Bread"], index: "1"},
	{name: "Burrito", ingredients: ["Beans", "Rice", "Tortilla", "Salsa"], index: "2"}
]

ReactDOM.render(
	<RecipeTable recipes={RECIPES} />, 
	document.getElementById('container')
);