import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="saponification"
export default class extends Controller {

  static targets = ["ingredient","ingredientsJson","caracteristiquesIngredient","ingredientTable","ingredientItem","ingredientTd","ingPoids","sommePoids","sommeNaoh","pourcentageSurgraissage","savonProprietes","sommeKoh","finalSavonChoice","choiceSavon","resultsNaohKoh","qtyWater","pourcentageEau","sommeGraissesINS","qtySoude","selectSoude","concentrationLessive","qtyLessiveSoude","ingPourcentage","pourcentagePoidsTotal","addIngBtn","listIngredients","saveSavon","typeAlcali","ingSelectionneProprietes","closeInfo","alcaliAlertMessage","alertPoids","syntheseProprietes","ajoutIngredients","ingdtAjoute"]
  static outlets = [ "apexcharts" ]

  connect() {
    console.log("sapo")
    console.log("JSON.parse(document.getElementById('JSON').dataset['ingredients'])")
    console.log(this.apexchartsOutlets)
  }
  createTr(event){
    const ingredients = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)
    let newTd = '<i class="fa-regular fa-circle-xmark" data-action="click->saponification#removeIngredientOption"></i><td><input type="text" class="table_ingredients_input" data-saponification-target="ingredientTd"></td><td><input type="number" data-action="change->saponification#changePourcentageIng" data-saponification-target="ingPourcentage" value="0" disabled></td><td><input type="number" data-action="click->saponification#clickInput change->saponification#changePoids" data-saponification-target="ingPoids" value="0"><i class="fa-regular fa-circle-question information" data-action="click->saponification#infoIngredient"></i></td>'
    console.log(document.querySelectorAll('[data-ing]'))
    let newTr = document.createElement('tr')
    newTr.classList.add("ing_to_get")
    newTr.dataset.ing = event.currentTarget.value
    newTr.innerHTML = newTd
    //
    if (this.ingredientTableTarget.getElementsByClassName('pre_input_ingredient').length>0) {

      this.ingredientTableTarget.getElementsByClassName('pre_input_ingredient')[0].replaceWith(newTr)
    }
    else {
      this.ingredientTableTarget.appendChild(newTr)
      //this.ingredientTableTarget.lastChild.getElementsByTagName("input")[0].value = ingredients[event.currentTarget.value]["French_name"]
    }
    newTr.querySelector("input").value = ingredients[event.currentTarget.value]["French_name"]

  }
  getIngredient(event){
    let ingredient = event.currentTarget.value
    const ingredients = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)
    //console.log(ingredients["Abyssinian Oil"])
    let inputs = Array.from(this.caracteristiquesIngredientTarget.querySelectorAll("input"))
    inputs.forEach((element) => {
      element.value = ingredients[ingredient][element.name]
    })
    this.caracteristiquesIngredientTarget.dataset.ingredientName = ingredient
  }
  addIngredientOption(ingredientEnglish){
    let listIngredients = this.listIngredientsTarget.querySelector(".liste_ingredients_options select")
    listIngredients.querySelector(`[value="${ingredientEnglish}"]`).dispatchEvent(new MouseEvent("dblclick"))

    //document.querySelector(".liste_ingredients_options select").value
    //let indexPlus = Array.from(event.currentTarget.parentElement.querySelectorAll(".fa-plus")).indexOf(event.currentTarget)
    //this.ingredientItemTargets[indexPlus].dispatchEvent(new MouseEvent("dblclick"))
  }
  removeIngredientOption(event){
    let indexIngdt = Array.from(event.currentTarget.parentElement.parentElement.querySelectorAll("tr.ing_to_get")).indexOf(event.currentTarget.parentElement)
    event.currentTarget.parentElement.remove()
    this.ingredientItemTargets.filter((item) => item.value === event.currentTarget.parentElement.dataset.ing)[0].classList.remove("ingredient_add_to_recipe")
    this.deleteIngdtTable(indexIngdt)
  }
  doubleClick(event){
    //alert("Gogole")
    //console.log(this.ingredientTdTargets)

    if (this.ingredientTableTarget.querySelectorAll("tr.ing_to_get").length === 0){
      this.createTr(event)
    }
    else if(this.ingredientTableTarget.querySelectorAll("tr.ing_to_get").length !== 0) {
      let ingredientsList = new Array()
      Array.from(this.ingredientTableTarget.querySelectorAll("tr.ing_to_get")).forEach((element)=>{
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
    event.currentTarget.classList.add("ingredient_add_to_recipe")
    this.synthesePropertiesIngredients(event.currentTarget.value)
  }
  clickInput(event){
    event.currentTarget.value = ""
    this.changePoids
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
    this.sommeNaoh()
    this.sommeKoh()

    //rajout pourcentages
    this.modifPourcentagesIngs()
    //
    this.proprietesSavon()
    this.checkPoids()
    //rajout des appels à fonctions suivantes
    this.changeSoude()
    this.getQtyLessiveSoude()
    this.getConcentrationLessive()

  }
  checkPoids(){
    if(parseFloat(this.sommePoidsTarget.innerText) < 500){
      this.alertPoidsTarget.classList.add("visible")
    }
    else {
      this.alertPoidsTarget.classList.remove("visible")
    }
  }
  changePourcentageIng(){
  }
  modifPourcentagesIngs(){
    //modifie le pourcentage de tous les ingrédients quand le poids d'un ingrédient change
    let somme = parseFloat(this.sommePoidsTarget.innerText)
    if (somme === 0){
      this.pourcentagePoidsTotalTarget.innerText = "0%";
    }
    else {
      this.pourcentagePoidsTotalTarget.innerText = "100%";
    }
    this.ingPoidsTargets.forEach((element)=>{

      let pourcentageIng = (parseFloat(element.value)/somme)*100

      let indexIng = this.ingPoidsTargets.indexOf(element)

      this.ingPourcentageTargets[indexIng].value = pourcentageIng

    })
  }

  changeSurgraissage(event) {
    let naohBase = this.getNaoh() //Appelle une autre fonction
    let newNaoh = parseFloat(naohBase) * (1 - (parseFloat(this.pourcentageSurgraissageTarget.value)/100))
    this.sommeNaohTarget.value = newNaoh.toFixed(2);

    //ajout surgraissage au formulaire SavonSave
    this.saveSavonTarget.querySelector(".recipe_soap_surgraissage_taux").value = this.pourcentageSurgraissageTarget.value
  }

  getNaoh(){
    let naoh = 0
    this.ingredientTableTarget.querySelectorAll("tr.ing_to_get").forEach((element)=>{
      let ingredient = element.dataset.ing
      let qty = parseFloat(element.lastChild.querySelector("input").value)
      naoh += JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)[ingredient]["NaOH SAP"] * qty
    })
    return naoh;
  }
  synthesePropertiesIngredients(event){
    let ingdtEng = event;
    let ingredients = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)
    let ingdt = ingredients[event]
    let insertHtml = `<tr><td>${ingdt["French_name"]}</td><td>${ingdt["Hardness"]}</td><td>${ingdt["Cleansing"]}</td><td>${ingdt["Condition"]}</td><td>${ingdt["Bubbly"]}</td><td>${ingdt["Creamy"]}</td><td>${ingdt["Iodine"]}</td><td>${ingdt["Vitesse_tracage"]}</td></tr>`;
    this.syntheseProprietesTarget.querySelector("tbody").insertAdjacentHTML("beforeend", insertHtml);
  }
  deleteIngdtTable(index){
    Array.from(this.syntheseProprietesTarget.querySelector('tbody').querySelectorAll('tr'))[index].remove()
  }


  sommeNaoh(){
    let naoh = 0
    this.ingredientTableTarget.querySelectorAll("tr.ing_to_get").forEach((element)=>{
      let ingredient = element.dataset.ing
      let qty = parseFloat(element.lastChild.querySelector("input").value)
      naoh += JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)[ingredient]["NaOH SAP"] * qty
    })

    if (this.finalSavonChoiceTarget.dataset.finalSavonChoice === "solide") {
      this.sommeNaohTarget.value = naoh.toFixed(2)
      this.qtySoudeTargets.forEach((element=>{element.value = naoh.toFixed(2) }))
    }

  }

  sommeKoh() {
      let koh = 0;
      this.ingredientTableTarget.querySelectorAll("tr.ing_to_get").forEach((element)=>{
        let ingredient = element.dataset.ing
        let qty = parseFloat(element.lastChild.querySelector("input").value)
        koh += JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)[ingredient]["KOH SAP"] * qty
      })
      koh = koh * 0.9
      console.log(`KOH: ${koh}`)

      if (this.finalSavonChoiceTarget.dataset.finalSavonChoice === "liquide") {
        this.insertKoh(koh);
      }
  }

  insertKoh(eleonore) {
    console.log("Hello")
    let Koh = eleonore;
    this.sommeKohTarget.value = Koh.toFixed(2);
    this.qtySoudeTargets.forEach((element=>{element.value = Koh.toFixed(2) }))
  }

  changeEau(){

    //modification de la qte d'eau en fonction de la concentration de lessive
    //let sommeGraisses = parseInt(this.sommeGraissesINSTarget.value)
    // récupérer le poids total des graisses * concentration de lessive entrée

  }
  changeSoude(){
    let poidsEau = parseFloat(this.sommePoidsTarget.innerText) * (parseFloat(this.pourcentageEauTarget.value)/100)
    console.log("ChangeEau")
    console.log(poidsEau)

    this.qtyWaterTargets.forEach((element)=>{element.value = poidsEau.toFixed(2)})
    //quand la concentration de lessive change...

    this.getQtyLessiveSoude()
  }
  getQtyLessiveSoude(){
    let poidsSoude = parseFloat(this.resultsNaohKohTarget.querySelector(".selected input").value)
    let qtySoude = poidsSoude *(1- parseFloat(this.pourcentageSurgraissageTarget.value)/100)
    console.log(qtySoude)

    //this.qtySoudeTargets.forEach((element=>{element.value = qtySoude.toFixed(2) }))

    // let concentrationLessive = XX
    // let tauxSurgraissage = YY
    // get poids de la soude = poids du gras * concentration de la lessive désirée
    // qty soude = Poids de la soude * (1 - taux de surgraissage)
    // qty lessive de soude = qty soude + concentration de la lessive
  }

  selectSavon(event){
    console.log("savon choice")
    this.choiceSavonTargets.forEach((element)=>{element.classList.remove("checked")});
    event.currentTarget.classList.add("checked")
    let typeSavon = this.choiceSavonTargets.find((elt)=>elt.classList.contains("checked")).dataset.typeSavon;

    this.finalSavonChoiceTarget.dataset.finalSavonChoice = typeSavon;

    //let typeSavon = dataset.typeSavon;
    console.log(typeSavon);

    this.resultsNaohKohTarget.querySelectorAll(".select_choice_savon_method").forEach((element)=>
    {
      element.classList.remove("selected");
    });
    this.resultsNaohKohTarget.querySelector(`.select_choice_savon_method.${typeSavon}`).classList.add("selected")

    Array.from(this.alcaliAlertMessageTarget.querySelectorAll(".message_alert_alcali_type")).forEach((element)=>{
      element.classList.remove("visible")
    })

    if (typeSavon === "solide") {
      console.log(typeSavon);
      Array.from(this.selectSoudeTarget.querySelectorAll(".solide")).forEach((element)=>{element.style.display = ""})
      Array.from(this.selectSoudeTarget.querySelectorAll(".liquide")).forEach((element)=>{element.style.display = "none"})
      this.selectSoudeTarget.value = "naoh"
      this.selectSoudeTarget.disabled = false

      this.sommeNaoh()
      this.typeAlcaliTarget.value = "NaOH"

      this.alcaliAlertMessageTarget.querySelector(".message_alert_alcali_type.naoh").classList.add("visible")
    }
    else if (typeSavon === "liquide") {
      Array.from(this.selectSoudeTarget.querySelectorAll(".liquide")).forEach((element)=>{element.style.display = ""})
      this.selectSoudeTarget.querySelectorAll(".solide").forEach((element)=>{element.style.display = "none"})
      this.selectSoudeTarget.value = "koh"
      this.selectSoudeTarget.disabled = false

      this.sommeKoh()
      this.typeAlcaliTarget.value = "KOH"

      this.alcaliAlertMessageTarget.querySelector(".message_alert_alcali_type.koh").classList.add("visible")
    }
    if (this.choiceSavonTargets.find((elt)=>elt.classList.contains("checked")).dataset.typeSavon === "solide" && this.qtyWaterTarget.classList.contains("blocked")) {
      this.selectSoudeTarget.value = "lessive";
    }

  }

  lessiveSelect(){
    if(this.selectSoudeTarget.value==="lessive"){
      this.typeAlcaliTarget.value = "Lessive"
      this.concentrationLessiveTarget.classList.add("visible")
      this.qtyLessiveSoudeTarget.classList.add("visible")

      this.alcaliAlertMessageTarget.querySelector(".message_alert_alcali_type.koh").classList.remove("visible")
      this.alcaliAlertMessageTarget.querySelector(".message_alert_alcali_type.lessive").classList.add("visible")

      this.pourcentageEauTarget.classList.add("blocked")
      this.pourcentageEauTarget.disabled = true

      this.qtyWaterTargets.forEach((element)=>{
        element.classList.add("blocked")
        element.disabled = true
      })


      this.qtySoudeTargets.forEach((element)=>{
        element.classList.add("blocked")
        element.disabled = true
      })

    }
    else {
      this.typeAlcaliTarget.value = "KOH"
      this.concentrationLessiveTarget.classList.remove("visible")
      this.qtyLessiveSoudeTarget.classList.remove("visible")

      this.pourcentageEauTarget.disabled = false
      this.pourcentageEauTarget.classList.remove("blocked")

      this.qtyWaterTargets.forEach((element)=>{
        element.classList.remove("blocked")
        element.disabled = false
      })

      this.qtySoudeTargets.forEach((element)=>{
        element.classList.remove("blocked")
        element.disabled = false
      })
    }
  }

  getConcentrationLessive(){
    let concentrationLessive = parseFloat(this.concentrationLessiveTarget.value);
    let qtyLessiveFinal = parseFloat(this.qtySoudeTarget.value) / (concentrationLessive/100)
    this.qtyLessiveSoudeTarget.value = qtyLessiveFinal.toFixed(2);
  }

  addIngButton(){
    let ing = this.caracteristiquesIngredientTarget.dataset.ingredientName
    this.addIngredientOption(ing)
  }

  insertSaveSavon(propsSavon){
    let ingredientsSelected = Array.from(this.ingredientTableTarget.querySelectorAll("tr.ing_to_get"))

    let arrayFormIngredients = []

    ingredientsSelected.forEach((ligne)=>{
      let nameIng = ligne.dataset.ing;
      let qtyIng = ligne.lastChild.querySelector("input").value
      let hashIng = `{"name_ing":"${nameIng}","qty":${qtyIng}}`
      arrayFormIngredients.push(hashIng)
    })
    //'[{"product_id":123,"name":"stack"},{"product_id":456,"name":"overflow"}]'

    this.saveSavonTarget.querySelector(".ing_list_form_save").value = JSON.stringify(arrayFormIngredients)


    // Add proprietes savon in form
    let keysSavonSave = Object.keys(JSON.parse(propsSavon)).slice(0,6)

    let dataJson = JSON.parse(propsSavon)

    keysSavonSave.forEach((key)=>{
      this.saveSavonTarget.querySelector(`.recipe_soap_${key.toLowerCase()}`).value = dataJson[key]
    })
    //this.saveSavonTarget.querySelector("#recipe_soap_hardness").value

    // [{"name_ing":"","qty":20.0}]
    //let proprietesSavon = propsSavon;
  }
  saveSoapSubmit(){
    this.saveSavonTarget.querySelector("form").submit();
  }
  infoIngredient(event){
    const ingredients = JSON.parse(this.ingredientsJsonTarget.dataset.ingredients)
    let ing = event.currentTarget.parentElement.parentElement.dataset.ing;
    this.ingSelectionneProprietesTarget.classList.add("open")
    this.ingSelectionneProprietesTarget.querySelector(".titre_tool").innerText = `Propriétés - ${ingredients[ing]["French_name"]}`
    let tds = Array.from(this.ingSelectionneProprietesTarget.querySelector("table").querySelectorAll("td"))
    tds.filter((item)=> item.hasAttribute("name")).forEach((element)=>{
      element.innerText = ingredients[ing][element.attributes.name.value]
    })

  }
  closeInfoIng(event){
    this.closeInfoTarget.parentElement.parentElement.classList.remove("open")
  }


  proprietesSavon(){
    let ingredientsSelected = Array.from(this.ingredientTableTarget.querySelectorAll("tr.ing_to_get")) // Array des ingrédients sélectionnés.
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
    this.insertSaveSavon(JSON.stringify(savonProps)) //On appelle la function pour le formulaire SaveSavon.
    //alert("Propriete savon")
    //alert(document.querySelector(".tabs_list").dataset.series)
  }

  insertProprietes(proprietesJson){

    let proprietes = JSON.parse(proprietesJson);

    let inputs = Array.from(this.savonProprietesTarget.querySelectorAll("input"));

    Object.keys(proprietes).forEach((prop)=>{
      this.savonProprietesTarget.querySelector(`input[name=${prop}]`).value = proprietes[prop]
      this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("color_alert")
      this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("color_alert")
      if(prop === "Hardness"){
        if(proprietes[prop]>=29 && proprietes[prop]<=54){
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("green")
        }
        else{
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
        }
      }
      else if(prop === "Cleansing"){
        if(proprietes[prop]>=12 && proprietes[prop]<=22){
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("green")
        }
        else{
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
        }
      }
      else if(prop === "Condition"){
        if(proprietes[prop]>=44 && proprietes[prop]<=69){
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("green")
        }
        else{
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
        }
      }
      else if(prop === "Bubbly"){
        if(proprietes[prop]>=14 && proprietes[prop]<=46){
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("green")
        }
        else{
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
        }
      }
      else if(prop === "Creamy"){
        if(proprietes[prop]>=16 && proprietes[prop]<=48){
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("green")
        }
        else{
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
        }
      }
      else if(prop === "Iodine"){
        if(proprietes[prop]>=41 && proprietes[prop]<=70){
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("green")
        }
        else{
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
        }
      }
      else if(prop === "INS"){
        if(proprietes[prop]>=136 && proprietes[prop]<=170){
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("green")
        }
        else{
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
        }
      }
      else if(prop === "Vitesse_tracage"){
        if(proprietes[prop]<1){
          // rouge
          // Très lent
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("yellow")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).value = "Très lent"
        }
        else if(proprietes[prop]>=1 && proprietes[prop]<=3){
          //jaune
          // Lent
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("yellow")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).value = "Lent"
        }
        else if(proprietes[prop]>=4 && proprietes[prop]<=6){
          //verte
          //normal
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("yellow")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).value = "Normal"
        }
        else if (proprietes[prop]>=7 && proprietes[prop]<=10){
          //jaune
          //rapide
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("yellow")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).value = "Rapide"
        }
        else if (proprietes[prop]>10){
          //rouge
          //très rapide
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("green")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.remove("yellow")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).classList.add("red")
          this.savonProprietesTarget.querySelector(`input[name=${prop}]`).value = "Très rapide"
        }
      }
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

    //update donnees by key
    let donnees = JSON.parse(document.querySelector(".tabs_list").dataset.donnees); // jeu des 6 indicateurs principaux
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



    // ne conserver que les 6 premiers éléments de l'objet
    let chartFirstPropsElements = Object.fromEntries(Object.entries(chartProps).slice(0,6))

    this.updateSeries(indexTab,JSON.stringify(Object.values(chartFirstPropsElements)))
  }

  addAjout(){
    let newTr = `
    <tr class="parfum_argile_add" data-saponification-target="ingdtAjoute">
          <td>
            <select name="" id="">
              <option value="parfum">Parfum/Huile essentielle</option>
              <option value="argile">Argile</option>
              <option value="colorant">Colorant</option>
            </select><span data-action="click->saponification#addAjout"><i class="fa-solid fa-circle-plus"></i></span>
          </td>
          <td><input type="text" placeholder="nom de votre parfum/huile"></td>
          <td><input type="number" placeholder="%"></td>
          <td><input type="number" placeholder="g" data-action="change->saponification#totalAjout" value="0"></td>
    </tr>
    `;
    this.ajoutIngredientsTarget.querySelector('tbody').insertAdjacentHTML('beforeend',newTr)
  }
  totalAjout(){
    let parfums = 0
    let argiles = 0
    let colorants = 0
    this.ingdtAjouteTargets.forEach((element)=>{
      if (element.querySelector("select").value === "parfum") {
        parfums += parseFloat(element.children[3].querySelector("input").value)
        return parfums
      }
      else if(element.querySelector("select").value === "argile"){
        argiles += parseFloat(element.children[3].querySelector("input").value)
        return argiles
      }
      else if(element.querySelector("select").value === "colorant"){
        colorants += parseFloat(element.children[3].querySelector("input").value)
        return colorants
      }
    })
    debugger;
    console.log(parfums)
    console.log(argiles)
    console.log(colorants)
  }

  updateSeries(index,serie){
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

    // Conserver uniquement les 6 premiers éléments
    newDatas.forEach(element=>{
      //element['data'] = JSON.parse(element['data']) // pour tous les éléments
      element['data'] = JSON.parse(element['data']).slice(0,6) // conserver les 6 premiers éléments

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
