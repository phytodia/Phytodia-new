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
    //debugger;
    return {
      chart: {
        type: 'radar',
        height: '400px',
        //width: '400px'
      },
      series: [{
        name: this.labelsValue[0],
        data: this.seriesValue
        //debugger;
        //name: this.labelsValue[0]
        //data: [80, 50, 30, 40, 100, 20]
      }],
      title: {
        text: 'Radar saponification basic'
      },
      yaxis: {
        stepSize: 20
      },
      xaxis: {
        categories: ['Hardness', 'Cleansing', 'Condition', 'Bubbly', 'Creamy', 'Iodine']
      }
      //series: this.seriesValue,
      //labels: this.labelsValue,

      //series: [44, 55, 13, 33],
      //labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
  }
  update(newData){
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
