import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="saponification"
export default class extends Controller {

  static targets = ["ingredient","ingredientsJson","caracteristiquesIngredient","ingredientTable","ingredientItem","ingredientTd","ingPoids","sommePoids","sommeNaoh","pourcentageSurgraissage","savonProprietes","sommeKoh","finalSavonChoice","choiceSavon"]
  static outlets = [ "apexcharts" ]

  connect() {
    console.log("sapo")
    console.log("JSON.parse(document.getElementById('JSON').dataset['ingredients'])")
    console.log(this.apexchartsOutlets)

  }
  createTr(event){
    const ingredients = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)
    let newTd = '<i class="fa-regular fa-circle-xmark" data-action="click->saponification#removeIngredientOption"></i><td><input type="text" class="table_ingredients_input" data-saponification-target="ingredientTd"></td><td><input type="number"></td><td><input type="number" data-action="change->saponification#changePoids" data-saponification-target="ingPoids" value="0"></td>'
    console.log(document.querySelectorAll('[data-ing]'))
    let newTr = document.createElement('tr')
    newTr.dataset.ing = event.currentTarget.value
    newTr.innerHTML = newTd

    this.ingredientTableTarget.appendChild(newTr)
    this.ingredientTableTarget.lastChild.getElementsByTagName("input")[0].value = ingredients[event.currentTarget.value]["French_name"]

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
  addIngredientOption(event){
    let indexPlus = Array.from(event.currentTarget.parentElement.querySelectorAll(".fa-plus")).indexOf(event.currentTarget)
    this.ingredientItemTargets[indexPlus].dispatchEvent(new MouseEvent("dblclick"))
  }
  removeIngredientOption(event){
    event.currentTarget.parentElement.remove()
    this.changePoids()
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
    this.sommeKoh()

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
    if (this.finalSavonChoiceTarget.dataset.finalSavonChoice === "solide") {
      let naoh = 0
      this.ingredientTableTarget.querySelectorAll("tr").forEach((element)=>{
        let ingredient = element.dataset.ing
        let qty = parseFloat(element.lastChild.querySelector("input").value)
        naoh += JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)[ingredient]["NaOH SAP"] * qty
      })
      this.sommeNaohTarget.value = naoh
    }

  }

  sommeKoh() {
    if (this.finalSavonChoiceTarget.dataset.finalSavonChoice === "liquide") {
      let Koh = 0;
      this.ingredientTableTarget.querySelectorAll("tr").forEach((element)=>{
        let ingredient = element.dataset.ing
        let qty = parseFloat(element.lastChild.querySelector("input").value)
        Koh += JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)[ingredient]["KOH SAP"] * qty
      })
      console.log(`KOH: ${Koh}`)
      this.insertKoh(Koh);
      }
  }

  insertKoh(eleonore) {

    console.log("Hello")
    let Koh = eleonore;
    this.sommeKohTarget.value = Koh;
  }

  selectSavon(event){
    console.log("savon choice")
    this.choiceSavonTargets.forEach((element)=>{element.classList.remove("checked")});
    event.currentTarget.classList.add("checked")
    let typeSavon = document.querySelector(".btn_savon_choix.checked").dataset.typeSavon;
    this.finalSavonChoiceTarget.dataset.finalSavonChoice = typeSavon;
    //let typeSavon = dataset.typeSavon;
    console.log(typeSavon);
    document.querySelectorAll(".select_choice_savon_method").forEach((element)=>
    {
      element.classList.remove("selected");
    });
    document.querySelector(`.select_choice_savon_method.${typeSavon}`).classList.add("selected")


    if (typeSavon === "solide") {
      console.log(typeSavon);
      this.sommeNaoh(event)
    }
    else if (typeSavon === "liquide") {
      this.sommeKoh()
    }

  }


  proprietesSavon(){

    let ingredientsSelected = Array.from(this.ingredientTableTarget.querySelectorAll("tr")) // Array des ingrédients sélectionnés.
    let totalPoids = parseFloat(this.sommePoidsTarget.innerText) // Poids total de la recette.

    let savonProps = JSON.parse(this.savonProprietesTarget.dataset.proprietes) //Propriétés du savon final

    const ingredientsData = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients) // Liste des ingrédients possible à ajouter dans la recette

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
    //alert("Propriete savon")
    //alert(document.querySelector(".tabs_list").dataset.series)
  }

  insertProprietes(proprietesJson){

    let proprietes = JSON.parse(proprietesJson);

    let inputs = Array.from(this.savonProprietesTarget.querySelectorAll("input"));

    Object.keys(proprietes).forEach((prop)=>{
      this.savonProprietesTarget.querySelector(`input[name=${prop}]`).value = proprietes[prop]
    })

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
    //document.querySelector(".tabs_list").dataset.series = JSON.stringify(seriesArray)

    let arrayDatas = [];
    let result = labelsArray.map((item, index) => [item, seriesArray[index]]);

    result.forEach((arr)=>{
      arrayDatas.push({name: arr[0],data:arr[1]})
    })
    //debugger;

    //update donnees by key
    let donnees = JSON.parse(document.querySelector(".tabs_list").dataset.donnees);
    let keyDonnees = document.querySelector(".tab.active").innerText;
    let newDonnees = Object.values(chartProps);

    let valuesToModify = donnees.find(obj => obj.name === keyDonnees);
    valuesToModify['data'] = JSON.stringify(newDonnees);

    document.querySelector(".tabs_list").dataset.donnees = JSON.stringify(donnees)

    //this.ingredientsJsonTarget.dataset.series = JSON.stringify(Object.values(chartProps))
    //console.log(this.ingredientsJsonTarget.dataset.series)

    //alert("insert Proprietes")
    //alert(document.querySelector(".tabs_list").dataset.series)

    //this.apexchartsOutlets.forEach((element)=>{
    //  element.chart.updateOptions({
    //    series: arrayDatas
    //  })
    //})

    //this.apexchartsOutlets[indexTab].chart.updateOptions({
    //  series: arrayDatas
    //})
    //this.apexchartsOutlets[indexTab].chart.updateSeries([{
    //  data: newchartProps
    //}])

    this.updateSeries(indexTab,JSON.stringify(Object.values(chartProps)))
  }

  updateSeries(index,serie){
    //debugger;
    let indexTab = index;
    let newSerie = JSON.parse(serie)
    if(newSerie[0] === null){
      newSerie = [0,0,0,0,0,0]
    }
    //update serie
    let seriesArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.series))
    if (Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.series)).length === 1){
      indexTab = 0;
    }

    seriesArray[indexTab] = newSerie
    //update html with new serie

    document.querySelector(".tabs_list").dataset.series = JSON.stringify(seriesArray)
    //alert(document.querySelector(".tabs_list").dataset.series)

    //this.updateAllcharts()
    this.updatemyChart(indexTab)
  }
  updatemyChart(index){
    let indexTab = index;
    let labelsArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.labels));
    let seriesArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.series));

    let arrayUpdate = [];
    labelsArray.forEach((label)=>{
      arrayUpdate.push({name:label,data:seriesArray[labelsArray.indexOf(label)]});
    })
    //this.connect()
    if (Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.labels)).length === 1){
      indexTab = 0;
    }
    let newDatas = JSON.parse(document.querySelector(".tabs_list").dataset.donnees)
    newDatas.forEach(element=>{
      element['data'] = JSON.parse(element['data'])
    })
    //arrayUpdate.push(newDatas)
    //console.log(labelsArray)
    //console.log(seriesArray)
    this.apexchartsOutlets[indexTab].chart.updateOptions({
      //series: arrayUpdate
      series: newDatas
    })

  }
  updateAllcharts(){
    let labelsArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.labels));
    let seriesArray = Array.from(JSON.parse(document.querySelector(".tabs_list").dataset.series));

    let arrayUpdate = [];
    labelsArray.forEach((label)=>{
      arrayUpdate.push({name:label,data:seriesArray[labelsArray.indexOf(label)]});
    })
    //result.forEach((arr)=>{
    //  arrayDatas.push({name: arr[0],data:arr[1]})
    //})
    //alert(arrayUpdate)
    let newDatas = JSON.parse(document.querySelector(".tabs_list").dataset.donnees)
    newDatas.forEach(element=>{
      element['data'] = JSON.parse(element['data'])
    })

    this.apexchartsOutlets.forEach((element)=>{
      element.chart.updateOptions({
        //series: arrayUpdate
        series: newDatas
      })
    })
     //series: [{data: [
  //  {x: "02-02-2002",y: 44}, {x: "12-02-2002",y: 51}]
  //}]
  }










}
