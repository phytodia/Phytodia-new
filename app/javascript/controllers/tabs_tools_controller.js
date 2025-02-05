import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs-tools"
export default class extends Controller {
  static targets = ["tabFaq","contentFaq"]
  connect() {
  }

  tabSelectFaq(event){
    let indexTab = this.tabFaqTargets.indexOf(event.currentTarget);
    this.tabFaqTargets.forEach((tab)=>{
      tab.classList.remove("selected")
    });
    this.tabFaqTargets[indexTab].classList.add("selected")

    this.contentFaqTargets.forEach((content)=>{
      content.classList.remove("visible")
    })
    this.contentFaqTargets[indexTab].classList.add("visible")
  }
}
