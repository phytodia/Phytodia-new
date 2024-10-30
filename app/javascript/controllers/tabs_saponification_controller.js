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
    //fetch('tools/new_recipe_partial')
    //  .then(response => response.text())
    //  .then(html => this.element.innerHTML = html
    //    debugger;
    //  let newTab = `<div class="tab_content" data-tabs-saponification-target="recipeContent">${html}</div>`;
    //  tabs.insertAdjacentHTML("beforeend", newTab);
    //)

    let tabsRecipes = document.querySelector(".tab_contents")
    let tabsList = document.querySelector(".tabs_list")

    let newTab = '<div class="tab" data-action="click->tabs-saponification#tabSelect" data-tabs-saponification-target="tabRecipe"><span>Recette #</span><i class="fa-regular fa-circle-xmark fa-l" data-action="click->tabs-saponification#removeRecipe"></i></div>';

    tabsList.insertAdjacentHTML("beforeend", newTab);

    const parser = new DOMParser();
    fetch('/new_recipe_partial')
    .then(response => response.text())
    .then(html => {
      let document = parser.parseFromString(html, "text/html");
      html = document.body.querySelector("#recipe")
      let newRecipe = `<div class="tab_content" data-tabs-saponification-target="recipeContent">${html.innerHTML}</div>`;
      tabsRecipes.insertAdjacentHTML("beforeend", newRecipe);
    })
    .catch(error => console.error('Error fetching new recipe partial:', error));

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
