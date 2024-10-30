import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs-saponification"
export default class extends Controller {
  static targets = ["tabRecipe","newRecipe","recipeContent","tabIndex","chart","chartParent"]
  static outlets = [ "apexcharts" ]
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
  newRecipe(event){
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

    let seriesArray = JSON.parse(document.querySelector(".tabs_list").dataset.series)
    seriesArray.push([0,0,0,0,0,0])
    document.querySelector(".tabs_list").dataset.series = JSON.stringify(seriesArray)

    let labelsArray = JSON.parse(document.querySelector(".tabs_list").dataset.labels)
    labelsArray.push("Recette")
    document.querySelector(".tabs_list").dataset.labels = JSON.stringify(labelsArray)
    //debugger;
    //this.apexchartsOutlets.forEach((element)=>{
    //  element.chart.updateOptions({
    //    series: arrayDatas
    //  })
    //})

     // rendre actif la tab nouvellement crée + son recipe
     //let indexTab = Array.from(tabsList.children).indexOf(tabsList.lastChild)
     //Array.from(tabsList.children).forEach((element)=>{
     //  element.classList.remove("active")
     //})
     //this.tabRecipeTargets.forEach((element)=>{
     //  element.classList.remove("active")
     //})
     //tabsList.children[indexTab].classList.add("active")
     //this.tabRecipeTargets[indexTab].classList.add("active")
     // fin tab + recipe => actif
     //debugger;
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
