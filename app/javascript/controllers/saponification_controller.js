import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="saponification"
export default class extends Controller {
  static targets = ["ingredient","ingredientsJson","ingredientTable","ingredientTd","ingPoids","sommePoids","sommeNaoh","pourcentageSurgraissage"]
  connect() {
    console.log("sapo")
    console.log("JSON.parse(document.getElementById('JSON').dataset['ingredients'])")
  }
  createTr(event){
    let newTd = '<td><input type="text" data-saponification-target="ingredientTd"></td><td><input type="number"></td><td><input type="number" data-action="change->saponification#changePoids" data-saponification-target="ingPoids" value="0"></td>'
    console.log(document.querySelectorAll('[data-ing]'))
    let newTr = document.createElement('tr')
    newTr.dataset.ing = event.currentTarget.value
    newTr.innerHTML = newTd

    this.ingredientTableTarget.appendChild(newTr)
    this.ingredientTableTarget.lastChild.getElementsByTagName("input")[0].value = event.currentTarget.value

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
      this.createTr(event)
    }
    else if(this.ingredientTableTarget.querySelectorAll("tr").length !== 0) {
      let ingredientsList = new Array()
      Array.from(this.ingredientTableTarget.querySelectorAll("tr")).forEach((element)=>{
        ingredientsList.push(element.dataset.ing)
        //console.log(ingredientsList)
      })
      console.log(ingredientsList)
      if(!ingredientsList.includes(event.currentTarget.value)) {

        this.createTr(event)

      }
      else {
        alert("Déjà présent dans le tableau")
      }
    }

  }
  changePoids(event){
    let somme = 0
    this.ingPoidsTargets.forEach((element)=>{
      if(element.value !== '') {
        somme = somme + parseFloat(element.value)
      }
    })
    console.log(`somme : ${somme}`)
    this.sommePoidsTarget.innerText = somme
    this.sommeNaoh(event)
    this.proprietesSavon()
  }

  changeSurgraissage(event) {
    let naohBase = this.getNaoh() //Appelle une autre fonction
    let newNaoh = parseFloat(naohBase) * (1 - (parseFloat(this.pourcentageSurgraissageTarget.value)/100))
    this.sommeNaohTarget.value = newNaoh
  }

  getNaoh(){
    let naoh = 0
    this.ingredientTableTarget.querySelectorAll("tr").forEach((element)=>{
      let ingredient = element.dataset.ing
      let qty = parseFloat(element.lastChild.querySelector("input").value)
      naoh += JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)[ingredient]["NaOH SAP"] * qty
    })
    return naoh;
  }


  sommeNaoh(event){
    let naoh = 0
    this.ingredientTableTarget.querySelectorAll("tr").forEach((element)=>{
      let ingredient = element.dataset.ing
      let qty = parseFloat(element.lastChild.querySelector("input").value)
      naoh += JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)[ingredient]["NaOH SAP"] * qty
    })
    this.sommeNaohTarget.value = naoh
  }
  proprietesSavon(){
    const savonProprietes = {
      hardness:0,
      cleansing:0,
      condition:0,
      bubbly:0,
      creamy:0,
      iodine:0,
      ins:0,
      lauric:0,
      myristic:0,
      palmitic:0,
      stearic:0,
      ricinoleic:0,
      oleic:0,
      linoeic:0,
      inoleic:0
    }
    debugger;
    let ingredientsSelected = Array.from(this.ingredientTableTarget.querySelectorAll("tr"))
    let totalPoids = parseFloat(this.sommePoidsTarget.innerText)
    let ingredients = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)

    let inputsProprietesSavon = Array.from(document.querySelector("#proprietes_savon").querySelectorAll("input"))
    ingredientsSelected.forEach((element)=>{
      element.lastElementChild.querySelector("input").value
      debugger;
    })

    //debugger;
  }

}
