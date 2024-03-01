import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="saponification"
export default class extends Controller {
  static targets = ["ingredient","ingredientsJson","ingredientTable"]
  connect() {
    console.log("sapo")

  }
  getIngredient(event){
      let ingredient = event.currentTarget.value
      const ingredients = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)
      //console.log(ingredients["Abyssinian Oil"])
      let inputs = Array.from(document.querySelector("#caracteristiques").querySelectorAll("input"))
      inputs.forEach((element) => {
        element.value = ingredients[ingredient][element.name]
      })
  }
  doubleClick(event){
    //alert("Gogole")
    let newTd = '<td><input type="text"></td><td><input type="number"></td><td><input type="number"></td>'
    let newTr = document.createElement('tr')
    newTr.innerHTML = newTd
    this.ingredientTableTarget.appendChild(newTr)
    this.ingredientTableTarget.lastChild.getElementsByTagName("input")[0].value = event.currentTarget.value

    //let newtr = document.createElement(
    //  "<tr><td><input type="text" data-saponification-target="ingredientTable"></td><td><input type="text"></td><td><input type="text"></td></tr>"
    //)

    //this.ingredientTableTarget.value = event.currentTarget.value
  }

}
