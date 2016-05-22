var IngredientList = React.createClass({

	getInitialState: function() {
		return {recipe: this.props.recipe}
	},
	handleRecipeEdit: function(recipe) {
		this.setState({recipe: recipe});
	},
	render: function() {
		var rows = [];
		var Panel = ReactBootstrap.Panel;
		var Button = ReactBootstrap.Button;
		this.state.recipe.ingredients.forEach(function(ingredient) {
			rows.push(<Panel>{ingredient}</Panel>)
		});
		return (
			<div>
			  {rows}
				<EditRecipeModal recipe={this.props.recipe} onRecipeEdit={this.handleRecipeEdit} />
			</div>
		);
	}
});

var RecipeList = React.createClass({
	getInitialState: function() {
		return {recipes: this.props.recipes}
	},
	render: function() {
		var rows = [];
		var ingredients = [];
		var Accordion = ReactBootstrap.Accordion;
		var Panel = ReactBootstrap.Panel;
		var index = 0;
		this.state.recipes.forEach(function(recipe) {
			rows.push(<Panel header={recipe.name} eventKey={index++}>
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
	getInitialState: function() {
		return {recipes: this.props.recipes}
	},
	handleRecipeSubmit: function(recipe) {
		RECIPES.push(recipe);
		this.setState({recipes: RECIPES});
	},
	handleRecipeUpdate: function() {
		this.setState({recipes: RECIPES});
	},
	render: function() {
		return (
			<div>
			  <RecipeList recipes={this.state.recipes} />
				<AddRecipeModal onRecipeSubmit={this.handleRecipeSubmit} />
		  </div>
		);
	}
});

var AddRecipeModal = React.createClass({

  getInitialState: function() {
    return { 
    	showModal: false,
    	name: '',
    	ingredients: ''
    };
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
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
		this.setState({ingredients: e.target.value});
  },

  handleSubmit: function(e) {
  	e.preventDefault();
  	var name = this.state.name;
  	var ingredients = this.state.ingredients.split(',')
  	this.props.onRecipeSubmit({name: name, ingredients: ingredients});
  	this.close();
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
	                onChange={this.handleNameChange}/>
	    	        <ControlLabel>Ingredients</ControlLabel>
	              <FormControl type="text"
	                value={this.state.ingredients}
	                placeholder="Enter ingredients separated by commas"
	                onChange={this.handleIngredientChange}/>
	            </FormGroup>
	          </form>
          </Modal.Body>
          <Modal.Footer>
          	<Button onClick={this.handleSubmit} bsStyle="primary">Add Recipe</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
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

  getValidationState: function() {
    const length = this.state.name.length;
    if (length > 2) return 'success';
    else if (length > 0) return 'error';
  },

  handleNameChange: function(e) {
    this.setState({ name: e.target.value });
  },

  handleIngredientChange: function(e) {
  	this.setState({ ingredients: e.target.value });
  },

  handleSubmit: function(e) {
  	e.preventDefault();
  	var name = this.state.name;
  	var ingredients = this.state.ingredients.split(',')
  	this.props.onRecipeEdit({name: name, ingredients: ingredients});
  	this.close();
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

            <form>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
      	        <ControlLabel>Recipe</ControlLabel>
                <FormControl type="text" value={this.state.name} onChange={this.handleNameChange}/>
      	        <ControlLabel>Ingredients</ControlLabel>
                <FormControl type="text" value={this.state.ingredients} onChange={this.handleIngredientChange}/>
              </FormGroup>
            </form>

          </Modal.Body>
          <Modal.Footer>
          	<Button onClick={this.handleSubmit} bsStyle="primary">Edit Recipe</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});


var RECIPES = [
	{name: "Peanut Butter Jelly", ingredients: ["Peanut Butter", "Jelly", "Bread"]},
	{name: "Burrito", ingredients: ["Beans", "Rice", "Tortilla", "Salsa"]}
]

ReactDOM.render(
	<RecipeTable recipes={RECIPES} />, 
	document.getElementById('container')
);