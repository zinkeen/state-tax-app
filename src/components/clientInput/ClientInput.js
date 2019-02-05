import React, { Component } from 'react';
import FederalTaxableIncome from './FederalTaxableIncome'
import StateInformation from './StateInformation';


class ClientInput extends Component {
  constructor(){
    super()
    this.state = {
     statesInformation:[{stateName: "AL", sales: 0}],
     federalTaxableIncome:0,
     
    }
  }
  addStateInfo = (stateInfo) =>{ 
    
    let clientApp = [...this.state.statesInformation]
    clientApp.push(stateInfo)
    this.setState({statesInformation:clientApp})

  }

  updateStateSelection = (currentStateName, updatedStateName) => {
    let statesInformation = [...this.state.statesInformation]
    let currentState = statesInformation.find(s => s.stateName === currentStateName)
    
    if(!currentState){return}
    
    currentState.stateName = updatedStateName
    this.setState({statesInformation})
  }

  removeStateInfo = (stateInfo) =>{ 
    if(this.state.statesInformation.length === 1){ return }
    let currentInfo = [...this.state.statesInformation]
    this.setState({
      statesInformation: this.state.statesInformation.filter(state => state.stateName!=stateInfo)
    })
  }
  addFederalInfo = (federalInfo) =>{
    this.setState({federalTaxableIncome:federalInfo})
  }


  // getTotalSales = () =>{
  //         let total=0
  //         let statesProvided = [...this.state.statesInformation]
  //         statesProvided.forEach(singleState =>{total+=singleState.sales})
  //         return total 
  // } 

  isSelected = stateAbbreviation => {
    console.log(`Checking whether : ${stateAbbreviation} is selected`)
    console.log( this.state.statesInformation.some(s => s.stateName === stateAbbreviation))
    return this.state.statesInformation.some(s => s.stateName === stateAbbreviation)
  }
  
  render() {
    
    return (
      <div className="ClientInput">
      <span>Enter Federal Taxable Income</span>

      <FederalTaxableIncome addFederalInfo = {this.addFederalInfo}/>
      <span>Enter Sales Shipped to the State</span>
      
      {/* <StateInformation name="-" sales={0}  addStateInfo={this.addStateInfo} removeStateInfo={this.removeStateInfo}/> */}
       {this.state.statesInformation.map(info =><StateInformation 
        name={info.stateName} 
        sales={info.sales} 
        removeStateInfo={this.removeStateInfo} 
        addStateInfo ={this.addStateInfo}
        isSelected={this.isSelected}
        updateStateSelection={this.updateStateSelection}
        key={info.stateName}/>)}
       <button>Submit All</button>
       <p>Provided Federal Taxable income is {this.state.federalTaxableIncome}</p>
       {/* {statesForReview.map(info=><p>In {info.stateName} Sales Are {info.sales} </p>)} */}
       {/* <p>Currently provided Sales are {this.getTotalSales()}</p> */}
        {/* <StateInformation addStateInfo ={this.addStateInfo}/> */}
      </div>
    );
  }
}

export default ClientInput ;