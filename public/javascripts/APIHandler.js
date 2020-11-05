class APIHandler {

  constructor () {
    this.BASE_URL = axios.create({baseURL:"https://www.thecocktaildb.com/api/json/v1/1/"})
  }

  getRandomCocktail = () => this.BASE_URL.get("random.php") 
  getAllCocktails = () => this.BASE_URL.get("filter.php?c=Cocktail")
  getCocktailByIngredient = (id) => this.BASE_URL.get('filter.php?i='+ id)
  getCocktailById = (id) => this.BASE_URL.get('lookup.php?i='+ id)
  getCocktailByName = (name) => this.BASE_URL.get('search.php?s='+ name)

}