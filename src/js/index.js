var IngredientList = React.createClass({

	render: function() {
		var rows = [];
		var Panel = ReactBootstrap.Panel;
		var Button = ReactBootstrap.Button;
		this.props.recipe.ingredients.forEach(function(ingredient) {
			rows.push(<Panel>{ingredient}</Panel>)
		});
		return (
			<div>
			  {rows}
				<EditRecipeModal recipe={this.props.recipe} />
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
			rows.push(<Panel header={recipe.name}>
				<p>Ingredients:</p>
				<IngredientList recipe={recipe} />
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
				<AddRecipeModal />
		  </div>
		);
	}
});

var EditRecipeModal = React.createClass({

  getInitialState: function() {
    return { 
    	showModal: false,
    	name: this.props.recipe.name,
    	ingredients: this.props.recipe.ingredients 
    };
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },

  editRecipe: function() {
  	alert("Edit a recipe");
  },

  deleteClick: function() {
  	alert("You have clicked delete");
  },

  getValidationState: function() {
    const length = this.state.name.length;
    if (length > 2) return 'success';
    else if (length > 0) return 'error';
  },

  handleNameChange: function(e) {
    this.setState({ name: e.target.value });
  },

  handleIngredientChange: function(e) {
  	this.setState({ ingredient: e.target.value });
  },

  handleSubmit: function(e) {
  	e.preventDefault();
  	var name = this.state.name;
  	var ingredients = this.state.ingredients;
  	this.setState({name: '', ingredients: []});
  },

  render: function() {
  	var Modal = ReactBootstrap.Modal;
		var Button = ReactBootstrap.Button;
		var FormGroup = ReactBootstrap.FormGroup;
		var FormControl = ReactBootstrap.FormControl;
		var ControlLabel = ReactBootstrap.ControlLabel;
    return (
      <div>
	      <Button bsStyle="danger" onClick={this.deleteClick}>Delete</Button>
      	<Button onClick={this.open}>Edit Recipe</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
      	        <ControlLabel>Recipe</ControlLabel>
                <FormControl type="text" value={this.state.name} onChange={this.handleNameChange}/>
      	        <ControlLabel>Ingredients</ControlLabel>
                <FormControl type="text" value={this.state.ingredients} onChange={this.handleIngredientChange}/>
              </FormGroup>
            </form>

          </Modal.Body>
          <Modal.Footer>
          	<Button onClick={this.editRecipe} bsStyle="primary">Edit Recipe</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

var AddRecipeModal = React.createClass({

  getInitialState: function() {
    return { 
    	showModal: false,
    	name: '',
    	ingredients: [] 
    };
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

  getValidationState: function() {
    const length = this.state.name.length;
    if (length > 2) return 'success';
    else if (length > 0) return 'error';
  },

  handleChange: function(e) {
    this.setState({ value: e.target.value });
  },

  render: function() {
  	var Modal = ReactBootstrap.Modal;
		var Button = ReactBootstrap.Button;
		var FormGroup = ReactBootstrap.FormGroup;
		var FormControl = ReactBootstrap.FormControl;
		var ControlLabel = ReactBootstrap.ControlLabel;
    return (
      <div>
      	<Button onClick={this.open} bsStyle="primary">Add Recipe</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
	          <form>
	            <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
	    	        <ControlLabel>Recipe</ControlLabel>
	              <FormControl type="text"
	                value={this.state.name}
	                placeholder="Recipe"
	                onChange={this.handleChange}/>
	    	        <ControlLabel>Ingredients</ControlLabel>
	              <FormControl type="text"
	                value={this.state.ingredients}
	                placeholder="Enter ingredients separated by commas"
	                onChange={this.handleChange}/>
	            </FormGroup>
	          </form>
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