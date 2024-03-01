import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="saponification"
export default class extends Controller {
  static targets = ["ingredient","ingredientsJson","ingredientTable","ingredientTd"]
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
    //console.log(this.ingredientTdTargets)
    if (this.ingredientTableTarget.querySelectorAll("tr").length === 0){

      let newTd = '<td><input type="text" data-saponification-target="ingredientTd"></td><td><input type="number"></td><td><input type="number"></td>'
      console.log(document.querySelectorAll('[data-ing]'))
      let newTr = document.createElement('tr')
      newTr.dataset.ing = event.currentTarget.value
      newTr.innerHTML = newTd

      this.ingredientTableTarget.appendChild(newTr)
      this.ingredientTableTarget.lastChild.getElementsByTagName("input")[0].value = event.currentTarget.value

    }
    else if(this.ingredientTableTarget.querySelectorAll("tr").length !== 0) {
      let ingredientsList = new Array()
      Array.from(this.ingredientTableTarget.querySelectorAll("tr")).forEach((element)=>{
        ingredientsList.push(element.dataset.ing)
        //console.log(ingredientsList)
      })
      console.log(ingredientsList)
      if(!ingredientsList.includes(event.currentTarget.value)) {
        let newTd = '<td><input type="text" data-saponification-target="ingredientTd"></td><td><input type="number"></td><td><input type="number"></td>'
        console.log(document.querySelectorAll('[data-ing]'))
        let newTr = document.createElement('tr')
        newTr.dataset.ing = event.currentTarget.value
        newTr.innerHTML = newTd

        this.ingredientTableTarget.appendChild(newTr)
        this.ingredientTableTarget.lastChild.getElementsByTagName("input")[0].value = event.currentTarget.value
      }
      else {
        alert("Déjà présent dans le tableau")
      }
    }

    //debugger;
    //console.log(this.ingredientTdTargets)
   //let ingSelect = event.currentTarget.value

    //Array.from(document.querySelectorAll('[data-ing]')).forEach((element)=>{
    //  if (element.dataset.ing == event.currentTarget.value) {
    //    console.log("oui")
    //    console.log(element.dataset.ing,event.currentTarget.value)
    //  }
    //  else {
    //    console.log("non")
    //  }
    //})
    //if (this.hasingredientTdTargets) {
    //  console.log("oui")
    //}
    //else {
    //  console.log("non")
    //}
    //this.ingredientTdTargets.forEach((element)=>{
    //  if (ingSelect === element.value ) {
    //    //alert("Déjà sélectionné")
    //  }
    //  else {}
    //})

    //let newtr = document.createElement(
    //  "<tr><td><input type="text" data-saponification-target="ingredientTable"></td><td><input type="text"></td><td><input type="text"></td></tr>"
    //)

    //this.ingredientTableTarget.value = event.currentTarget.value
  }

}
