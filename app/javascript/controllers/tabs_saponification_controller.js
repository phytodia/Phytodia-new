import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs-saponification"
export default class extends Controller {
  static targets = ["tabRecipe","newRecipe","recipeContent","tabIndex"]
  connect() {

  }

  tabSelect(event){

    let indexTab = this.tabRecipeTargets.indexOf(event.currentTarget);
    this.recipeContentTargets.forEach((element)=>{
      element.classList.remove("active")
    })
    this.tabRecipeTargets.forEach((element)=>{
      element.classList.remove("active")
    })
    //debugger;
    this.recipeContentTargets[indexTab].classList.add("active");
    this.tabRecipeTargets[indexTab].classList.add("active");
    this.tabIndexTarget.dataset.index = indexTab.toString();

  }
  newRecipe(){
    let tabs = document.querySelector(".tab_contents")
    debugger;

  }

  removeRecipe(event){
    let indexTab = this.tabRecipeTargets.indexOf(event.currentTarget.parentElement)
    let recipetoRemove = this.recipeContentTargets[indexTab]
    let tabtoRemove = this.tabRecipeTargets[indexTab]
    recipetoRemove.remove()
    tabtoRemove.remove()
    this.recipeContentTargets.forEach((element)=>{
      element.classList.remove("active")
    })
    this.tabRecipeTargets.forEach((element)=>{
      element.classList.remove("active")
    })
    this.tabRecipeTargets[0].classList.add("active")
    this.recipeContentTargets[0].classList.add("active")
  }
}
