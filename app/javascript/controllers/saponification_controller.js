import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="saponification"
export default class extends Controller {
  static targets = ["ingredient","ingredientsJson"]
  connect() {
    console.log("sapo")
    const ingredients = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)
    console.log(ingredients["Abyssinian Oil"])
  }
  getIngredient(event){
    let ingredient = event.currentTarget.value
    console.log(ingredient)
  }
}
