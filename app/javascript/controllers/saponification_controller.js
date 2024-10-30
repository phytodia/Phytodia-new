import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="saponification"
export default class extends Controller {

  static targets = ["ingredient","ingredientsJson","caracteristiquesIngredient","ingredientTable","ingredientTd","ingPoids","sommePoids","sommeNaoh","pourcentageSurgraissage","savonProprietes","sommeKoh"]
  static outlets = [ "apexcharts" ]
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
    let inputs = Array.from(this.caracteristiquesIngredientTarget.querySelectorAll("input"))
    inputs.forEach((element) => {
      element.value = ingredients[ingredient][element.name]
    })
  }
  doubleClick(event){
    //alert("Gogole")
    //console.log(this.ingredientTdTargets)
    //debugger;
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
    //this.sommeKoh()
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
    //debugger;
    let ingredientsSelected = Array.from(this.ingredientTableTarget.querySelectorAll("tr")) // Array des ingrédients sélectionnés.
    let totalPoids = parseFloat(this.sommePoidsTarget.innerText) // Poids total de la recette.
    //debugger;
    let savonProps = JSON.parse(this.savonProprietesTarget.dataset.proprietes) //Propriétés du savon final
    //debugger;
    const ingredientsData = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients) // Liste des ingrédients possible à ajouter dans la recette
    //debugger;
    // Pour chaque propriété finale du savon, on itère et récupère les données des ingrédients sélectionnés au prorata de leur poids dans la recette.
    Object.keys(savonProps).forEach((prop)=>{
      savonProps[prop] = 0; // On remet à 0 la propriété du savon final.
      ingredientsSelected.forEach((ingredient)=>{
        savonProps[prop] += ((ingredientsData[ingredient.dataset.ing][prop]) * (parseFloat(ingredient.lastElementChild.querySelector("input").value)/totalPoids))
      });
    });
    // On arrondi les "propriétés du savon" à l'arrondi inférieur.
    for (const [key, value] of Object.entries(savonProps)) {
      savonProps[key] = Math.floor(value)
    }
    this.savonProprietesTarget.dataset.proprietes = JSON.stringify(savonProps)

    console.log(savonProps);
    this.insertProprietes(JSON.stringify(savonProps)) // On appelle la fonction qui insert les propriétés du savon dans les cases dédiées.
  }

  insertProprietes(proprietesJson){
    //debugger;
    let proprietes = JSON.parse(proprietesJson);

    let inputs = Array.from(this.savonProprietesTarget.querySelectorAll("input"));
    Object.keys(proprietes).forEach((prop)=>{
      this.savonProprietesTarget.querySelector(`input[name=${prop}]`).value = proprietes[prop]
    })
    //debugger;
    //let valuesSavon = proprietes;
    // changer les propriétés au format JSON au format Array []
    let indexTab = parseInt(document.querySelector(".tabs_list").dataset.index);
    const eltsSearched = ["Hardness","Cleansing","Condition","Bubbly","Creamy","Iodine"]

    let chartProps = JSON.parse(proprietesJson)
    delete chartProps.INS

    let seriesArray = JSON.parse(document.querySelector(".tabs_list").dataset.series);
    let labelsArray = JSON.parse(document.querySelector(".tabs_list").dataset.labels);

    let newchartProps = Object.values(chartProps)

    seriesArray[indexTab] = newchartProps
    document.querySelector(".tabs_list").dataset.series = JSON.stringify(seriesArray)

    let arrayDatas = [];
    let result = labelsArray.map((item, index) => [item, seriesArray[index]]);

    result.forEach((arr)=>{
      arrayDatas.push({name: arr[0],data:arr[1]})
    })


    //this.apexchartsOutlets.update(newchartProps) //insert
    //debugger;

    //debugger;
    //let x = Array.from(this.labelsValue)
    //let y = Array.from(this.seriesValue)
    //let result = x.map((item, index) => [item, y[index]]);
    //let arrayDatas = [];
    //result.forEach((arr)=>{
    //  arrayDatas.push({name: arr[0],data:arr[1]})
    //})
    //debugger;

    this.apexchartsOutlets.forEach((element)=>{
      element.chart.updateOptions({
        series: arrayDatas
      })
    })
    //this.apexchartsOutlets[indexTab].chart.updateOptions({
    //  series: arrayDatas
    //})
    //this.apexchartsOutlets[indexTab].chart.updateSeries([{
    //  data: newchartProps
    //}])
  }


  sommeKoh() {
    debugger;
    //debugger;
    //console.log("Coucou");
      let KOH = 0
      this.ingredientTableTarget.querySelectorAll("tr").forEach((element)=>{
        let ingredient = element.dataset.ing
        let qty = parseFloat(element.lastChild.querySelector("input").value)
        KOH += JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)[ingredient]["KOH SAP"] * qty
      })
      //debugger;
      //return KOH;
      console.log(`KOH: ${KOH}`)
      this.insertKoh(KOH);
  }
    ///
    insertKoh(eleonore) {
      //debuger;
      //console.log("Hello")
      let KOH = eleonore;
      this.sommeKohTarget.value = KOH;
    }








}
  //debugger;
  //console.log(`KOH: ${KOH}`)
