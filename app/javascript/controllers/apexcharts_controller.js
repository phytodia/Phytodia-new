import { Controller } from "@hotwired/stimulus"
import ApexCharts from "apexcharts"

// Connects to data-controller="apexcharts"
export default class extends Controller {
  static targets = ["chart","chartParent"]
  connect() {
    console.log("Hello apexcharts")
  }
  static values = {
    labels: ["Serie 1"],
    series: [80, 50, 30, 40, 100, 20]
  }

  initialize() {
    this.chart = new ApexCharts(this.chartTarget, this.chartOptions);
    this.chart.render();
    //debugger;
  }

  get chartOptions() {

    let x = Array.from(this.labelsValue)
    let y = Array.from(this.seriesValue)
    let result = x.map((item, index) => [item, y[index]]);

    let arrayDatas = [];
    result.forEach((arr)=>{
      arrayDatas.push({name: arr[0],data:arr[1]})
    })
    console.log(result);
    let newDatas = JSON.parse(document.querySelector(".tabs_list").dataset.donnees)
    newDatas.forEach(element=>{
      element['data'] = JSON.parse(element['data'])
    })
    newDatas = Array.from(newDatas)

    return {
      chart: {
        type: 'radar',
        height: '400px',
        //width: '400px'
      },
      series: arrayDatas,
      title: {
        text: ''
      },
      yaxis: {
        stepSize: 20
      },
      xaxis: {
        categories: ['Dureté', 'Pouvoir lavant', 'Douceur', 'Pouvoir moussant', 'Onctuosité', 'Indice Iodine']
      },
      dataLabels: {
        enabled: true}
      //colors:["#008000"]
      //series: this.seriesValue,
      //labels: this.labelsValue,

      //series: [44, 55, 13, 33],
      //labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
  }
  update(newData){
    // button to test update
    //this.seriesValue = [100, 100, 100, 100, 100, 100]
    //console.log(this.seriesValue)

    //this.chartTarget.children[0].remove()

    //this.chart = new ApexCharts(this.chartTarget, this.chartOptions);
    //this.chart.render();

    let datas = [20, 45, 10, 100, 70, 0];
    this.chart.updateSeries([{
      data: datas
    }])

  }
}
//https://www.colby.so/posts/interactive-charts-with-rails-and-stimulusreflex
