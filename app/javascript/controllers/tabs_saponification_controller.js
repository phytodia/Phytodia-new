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
    //let newTab = '<div class="tab_content" data-tabs-saponification-target="recipeContent"><div class=""><%= render partial:"recette2" %></div></div>'
    //tabs.insertAdjacentHTML("beforeend",newTab)
    const parser = new DOMParser();

    //fetch('tools/new_recipe_partial')
    //  .then(response => response.text())
    //  .then(html => this.element.innerHTML = html
    //    debugger;
    //  let newTab = `<div class="tab_content" data-tabs-saponification-target="recipeContent">${html}</div>`;
    //  tabs.insertAdjacentHTML("beforeend", newTab);
    //)

    fetch('/new_recipe_partial')
    .then(response => response.text())
    .then(html => {
      let document = parser.parseFromString(html, "text/html");
      html = document.body.querySelector("#recipe")
      let newTab = `<div class="tab_content" data-tabs-saponification-target="recipeContent">${html.innerHTML}</div>`;
      tabs.insertAdjacentHTML("beforeend", newTab);
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
