import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs-saponification"
export default class extends Controller {
  static targets = ["tabRecipe","newRecipe","recipeContent","tabIndex","chart","chartParent"]
  static outlets = [ "apexcharts","saponification" ]
  initialize(){
    let arrayDonnees = JSON.parse(document.querySelector(".tabs_list").dataset.donnees)
    let x = {name:"Recette α",data:"[0,0,0,0,0,0]"}
    arrayDonnees.push(x)
    document.querySelector(".tabs_list").dataset.donnees = JSON.stringify(arrayDonnees)
  }
  connect() {
    console.log(this.apexchartsOutlets)
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

    this.updatemyChart(indexTab)
  }
  newRecipe(event){
    const alphabet = ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω"]
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
      html = document.body.querySelector(".recipe")
      let newRecipe = `<div class="tab_content" data-tabs-saponification-target="recipeContent">${html.innerHTML}</div>`;
      tabsRecipes.insertAdjacentHTML("beforeend", newRecipe);
    })
    .catch(error => console.error('Error fetching new recipe partial:', error));

    let seriesArray = JSON.parse(document.querySelector(".tabs_list").dataset.series)
    seriesArray.push([0,0,0,0,0,0])
    document.querySelector(".tabs_list").dataset.series = JSON.stringify(seriesArray)

    let labelsArray = JSON.parse(document.querySelector(".tabs_list").dataset.labels)

    let letter = `Recette ${alphabet[Math.floor(Math.random()*alphabet.length)]}`
    while(labelsArray.includes(letter)){
      letter = `Recette ${alphabet[Math.floor(Math.random()*alphabet.length)]}`
    }
    labelsArray.push(letter)

    //debugger;
    //labelsArray.push("Recette")
    document.querySelector(".tabs_list").dataset.labels = JSON.stringify(labelsArray)

    this.tabRecipeTargets.slice(-1)[0].querySelector("span").innerText = letter
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
     //debugger;
     this.saponificationOutletElement.dataset.recipeSeries = "[0,0,0,0,0,0]"


    let donnees = JSON.parse(document.querySelector(".tabs_list").dataset.donnees);
    let newDonnees = {'name':letter,'data':'[0,0,0,0,0,0]'}
    donnees.push(newDonnees)
    document.querySelector(".tabs_list").dataset.donnees = JSON.stringify(donnees)


     //debugger;
     //debugger;
     //alert(JSON.stringify(seriesArray))
  }

  removeRecipe(event){
    let indexTab = this.tabRecipeTargets.indexOf(event.currentTarget.parentElement)
    let recipetoRemove = this.recipeContentTargets[indexTab]
    let tabtoRemove = this.tabRecipeTargets[indexTab]

    let seriesArray = JSON.parse(document.querySelector(".tabs_list").dataset.series)
    let labelsArray = JSON.parse(document.querySelector(".tabs_list").dataset.labels)

    let valSerieToDelete = Array.from(seriesArray)[indexTab];
    let valLabelToDelete = Array.from(labelsArray)[indexTab];

    //labelsArray = Array.from(labelsArray).splice(indexTab, 1)
    labelsArray = Array.from(labelsArray).filter(val => val !== valLabelToDelete);
    seriesArray = Array.from(seriesArray).filter(val => val !== valSerieToDelete);
    //return labelsArray;
    //seriesArray = Array.from(seriesArray).splice(indexTab, 1)
    //return seriesArray;

    document.querySelector(".tabs_list").dataset.labels = JSON.stringify(labelsArray)
    //debugger;
    document.querySelector(".tabs_list").dataset.series = JSON.stringify(seriesArray)

    recipetoRemove.remove()
    tabtoRemove.remove()

    //this.recipeContentTargets.forEach((element)=>{
    //  element.classList.remove("active")
    //})
    //this.tabRecipeTargets.forEach((element)=>{
    //  element.classList.remove("active")
    //})
    //this.tabRecipeTargets[0].classList.add("active")
    //this.recipeContentTargets[0].classList.add("active")
    //debugger;
    //alert(JSON.stringify(seriesArray))

    let keyDonnees = event.currentTarget.parentElement.innerText;
    let donnees =  JSON.parse(document.querySelector(".tabs_list").dataset.donnees)
    delete donnees[donnees.indexOf(donnees.find(obj => obj.name === keyDonnees))]
    donnees = donnees.filter(item => item !== null);
    //donnees = Object.entries(donnees).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
    document.querySelector(".tabs_list").dataset.donnees = JSON.stringify(donnees)

    //this.saponificationOutlets[0].connect()
    this.updatemyChart(indexTab)
    //this.updateAllcharts()
  }
  updatemyChart(index){

    let labelsArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.labels));
    let seriesArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.series));


    let arrayUpdate = [];
    labelsArray.forEach((label)=>{
      arrayUpdate.push({name:label,data:seriesArray[labelsArray.indexOf(label)]});
    })
    //console.log(labelsArray)
    //console.log(seriesArray)
    debugger;
    let newArrayUpdate = JSON.parse(document.querySelector(".tabs_list").dataset.donnees)
    this.apexchartsOutlets[index].chart.updateOptions({
      series: arrayUpdate
    })
  }

  updateAllcharts(){
    let labelsArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.labels));
    let seriesArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.series));
    //debugger;
    let arrayUpdate = [];
    labelsArray.forEach((label)=>{
      arrayUpdate.push({name:label,data:seriesArray[labelsArray.indexOf(label)]});
    })
    //result.forEach((arr)=>{
    //  arrayDatas.push({name: arr[0],data:arr[1]})
    //})
    //alert(arrayUpdate)

    this.apexchartsOutlets.forEach((element)=>{
      element.chart.updateOptions({
        series: arrayUpdate
      })
    })
     //series: [{data: [
  //  {x: "02-02-2002",y: 44}, {x: "12-02-2002",y: 51}]
  //}]
  }

}
