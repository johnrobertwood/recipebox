var IngredientList = React.createClass({
	deleteClick: function() {
		alert("You have clicked delete");
	},
	editClick: function() {
		alert("You have clicked edit");
	},
	render: function() {
		var rows = [];
		var Panel = ReactBootstrap.Panel;
		var Button = ReactBootstrap.Button;
		this.props.ingredients.forEach(function(ingredient) {
			rows.push(<Panel>{ingredient}</Panel>)
		});
		return (
			<div>
			  {rows}
				<Button bsStyle="danger" onClick={this.deleteClick}>Delete</Button>
				<Button onClick={this.editClick}>Edit</Button>
			</div>
		);
	}
});

var RecipeList = React.createClass({
	addClick: function() {
		alert("You have clicked Add Recipe");
	},
	render: function() {
		var rows = [];
		var ingredients = [];
		var Accordion = ReactBootstrap.Accordion;
		var Panel = ReactBootstrap.Panel;
		var Button = ReactBootstrap.Button;
		this.props.recipes.forEach(function(recipe) {
			rows.push(<Panel header={recipe.name} eventKey={recipe.index}>
				<p>Ingredients:</p>
				<IngredientList ingredients={recipe.ingredients} />
				</Panel>
				);
		});
		return (
			<div>
				<Accordion>{rows}</Accordion>
				<Button onClick={this.addClick} bsStyle="primary">Add Recipe</Button>
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

var RECIPES = [
	{name: "Peanut Butter Jelly", ingredients: ["Peanut Butter", "Jelly", "Bread"], index: "1"},
	{name: "Burrito", ingredients: ["Beans", "Rice", "Tortilla", "Salsa"], index: "2"}
]

ReactDOM.render(
	<RecipeTable recipes={RECIPES} />, 
	document.getElementById('container')
);