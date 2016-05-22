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
			</div>
		);
	}
});

var RecipeTable = React.createClass({
	render: function() {
		return (
			<div>
			  <RecipeList recipes={this.props.recipes} />
				<NewRecipeModal />
		  </div>
		);
	}
});

var RecipeForm = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
  },

  getValidationState: function() {
    const length = this.state.value.length;
    if (length > 2) return 'success';
    else if (length > 0) return 'error';
  },

  handleChange: function(e) {
    this.setState({ value: e.target.value });
  },

  render: function() {
  	var FormGroup = ReactBootstrap.FormGroup;
  	var FormControl = ReactBootstrap.FormControl;
  	var ControlLabel = ReactBootstrap.ControlLabel;
    return (
      <form>
        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
	        <ControlLabel>Recipe</ControlLabel>
          <FormControl type="text"
            value={this.state.value}
            placeholder="Recipe name"
            onChange={this.handleChange}/>
	        <ControlLabel>Ingredients</ControlLabel>
          <FormControl type="text"
            value={this.state.value}
            placeholder="Enter ingredients separated by commas"
            onChange={this.handleChange}/>
        </FormGroup>
      </form>
    );
  }
});

var NewRecipeModal = React.createClass({

  getInitialState: function() {
    return { showModal: false };
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },

  addRecipe: function() {
  	alert("Add a recipe");
  },

  render: function() {
  	var Modal = ReactBootstrap.Modal;
		var Button = ReactBootstrap.Button;
    return (
      <div>
      	<Button onClick={this.open} bsStyle="primary">Add Recipe</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>

	          <RecipeForm />

          </Modal.Body>
          <Modal.Footer>
          	<Button onClick={this.addRecipe} bsStyle="primary">Add Recipe</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
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