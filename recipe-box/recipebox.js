
//Recipe Box, Parent
class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          id: 0,
          title: 'Tacos',
          ingredients: ['taco shells', 'meat', 'cheese'],
          dir: 'put meat and cheese inside taco shell',
          featured: false
        },
        {
          id:1,
          title: 'Chocolate Milk',
          ingredients: ['chocolate', 'milk'],
          dir: 'put chocolate in milk. Stir 30 seconds.',
          featured: false
        },
        {
          id:2,
          title: 'BLT',
          ingredients: ['bacon', 'lettuce', 'tomato', 'ciabatta roll', 'mayonnaise'],
          dir: 'Toast ciabatta roll in toaster. Spread mayonnaise on one side. Top one-half of ciabatta with bacon, lettuce, and tomato. Place other ciabatta half on top. Place entire sandwich in panini press or waffle iron. Toast to desired level. Eat.',
          featured: false
        }
     ],
      showForm: false,
      showRecipe: false
    };
  }


  componentWillMount() {

  }

  _moveHeaderUp() {
    document.getElementsByTagName('h1')[0].style.marginTop = 'auto'
  }

  _moveHeaderDown() {
    document.getElementsByTagName('h1')[0].style.marginTop = '30vh'
  }


  _showForm() {
    this._moveHeaderUp()
    this.setState({ showRecipe: false, showForm: !this.state.showForm })
  }

  _showRecipe() {
    this._moveHeaderUp()
    this.setState({ showRecipe: true, showForm: false })
  }

  _addRecipe(obj) {

        this.setState(state => {
        this.state.recipes.splice(obj.id, 1, obj);
        return {recipes: state.recipes}
      })


     }







  _makeFeatured(id) {
    this._showRecipe()
    let  newFeature = this.state.recipes.map((recipe) => {

      recipe.featured = false;

      })
    this.state.recipes[id].featured=true;

    this.setState({ showRecipe: true, recipes: this.state.recipes })

  }

  _deleteRecipe(id) {
    console.log(id)
    this.setState(state => {
            this.state.recipes.splice(id, 1);
            return {recipes: state.recipes};
      console.log(this.state.recipes)
        });

    if (id-1 < 0) {
      this._makeFeatured(id+1)
    }
    else {
      this._makeFeatured(id-1)
    }

    }



  render() {
    return (
    <main>
        <Header showForm = {this._showForm.bind(this)} />
       { this.state.showForm ? <Form recipes={this.state.recipes} addRecipe = {this._addRecipe.bind(this)} makeFeatured = {this._makeFeatured.bind(this)} /> : null }
       { this.state.showRecipe ? <Recipe recipes={this.state.recipes} makeFeatured={this._makeFeatured.bind(this)} deleteRecipe = {this._deleteRecipe.bind(this)} editRecipe = {this._showForm.bind(this)} /> : null }


      <Nav recipes={this.state.recipes} makeFeatured={this._makeFeatured.bind(this)} />
    </main>
    )
  }
}

//=================================================
//CHILD ELEMENT
////Recipe Form
class Form extends React.Component {
  constructor(props) {
    super(props)
    if (event.target.classList.contains('round')) {
      console.log('round')
    this.state = {
      id: this.props.recipes.length,
      title: '',
      ingredients: '',
      dir: '',
      featured: true
                 };
    }

    else {
     let id = event.target.id
     console.log('edit button')
      this.state = {
        id: id,
        title: this.props.recipes[id].title,
        ingredients: this.props.recipes[id].ingredients,
        dir: this.props.recipes[id].dir,
        featured: true
      }
    }

  }

  handleChange(event) {
    switch(event.target.name) {
      case "title":
        this.setState({title: event.target.value})
        break;

      case "ingredients":
        if (event.target.value) {
        let ingredArr = event.target.value.split(',');
        this.setState({ingredients: ingredArr})
        }
        else {
          this.setState({ingredients: ""})
        }
        break;

      case "dir":
        this.setState({dir: event.target.value})
    }
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    let obj = this.state;
    this.props.addRecipe(obj);
  }


  render() {
    return(
      <div className="form">
      <form onSubmit={this.handleSubmit.bind(this)} className="recipe">
        <h2>Title</h2>
        <input type="text" name="title" placeholder="(ex. Oatmeal Chocolate Chip Cookies)" label="Title" onChange={this.handleChange.bind(this)} value = {this.state.title}></input>
        <h3>Ingredients</h3>
          <textarea name="ingredients" rows="10" cols="50" placeholder="Separate each ingredient with a comma or line-break. (ex. Eggs, milk, flour)" onChange={this.handleChange.bind(this)} value = {this.state.ingredients}></textarea>
         <h3>Directions</h3>
        <textarea name="dir" rows="10" cols="50" placeholder="(ex. Preheat the oven to 400&deg; F)" onChange={this.handleChange.bind(this)} value = {this.state.dir}></textarea>
     <button type="submit">
          Submit
        </button>
        </form>

        </div>
    )
  }

}

//=================================================
//CHILD COMPONENT
////Recipe
class Recipe extends React.Component {
  constructor(props) {
    super(props)

  }

  handleDelete(event) {

  this.props.deleteRecipe(event.target.id)
  }


  render() {

    let featured = this.props.recipes.filter((recipe) => {
      return recipe.featured==true
      }).shift()

    /*if (featured === undefined) {
      return <Form display="true" />
    }*/

    let ingredients;
    if (Array.isArray(featured.ingredients)) {
    ingredients = featured.ingredients.map((ingredient, index)=> {
      return <li key={index}>{ingredient}</li>
    })
    }

    return (
    <div className="card">
        <div className="recipe">
        <h2>{featured.title}</h2>
        <h3>Ingredients</h3>
        <ul>
          {ingredients}
        </ul>
        <h3>Directions</h3>
<p>{featured.dir}</p>
        <button id={featured.id} onClick = {this.props.editRecipe}>Edit</button>
        <button id={featured.id} onClick = {this.handleDelete.bind(this)}>Delete</button>
        </div>
        </div>

    )

  }
}


//=================================================
//CHILD COMPONENT
////Nav
class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(index) {

    this.props.makeFeatured(index)
  }

  render() {
   let titles = this.props.recipes.map((recipe, index) => {
     return (
      <a href="#" onClick={this.handleClick.bind(this, index)} key={recipe.id}>{recipe.title}</a>
     )
    })

    return (
    <nav>
      {titles}
    </nav>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
    <h1>Recipe Box<button className="round" onClick={this.props.showForm}>+</button></h1>
    )
  }
}

ReactDOM.render(
  <RecipeBox />, document.getElementById('app')
)
