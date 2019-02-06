import React, { Component } from 'react';
import FederalTaxableIncome from './FederalTaxableIncome'
import StateInformation from './StateInformation';
import axios from 'axios'

class ClientInput extends Component {
  constructor(){
    super()
    this.state = {
     statesInformation:{},
     federalTaxableIncome:0,
     stateList: [
      'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA',
      'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA',
      'MI','MN','MS','MO','MT','NE','NH','NJ','NM','NY','NC','OK','OR','PA','RI','SC','TN','UT',
      'VT','VA','WV','WI'
     ]
     
    }
  }

  addStateInfo = () =>{ 
    let clientApp = {...this.state.statesInformation}
    clientApp[this.state['newState'] || 'AL'] = 0
    this.setState({statesInformation:clientApp})
  }

  updateStateSelection = (currentStateName, updatedStateName) => {
    let statesInformation = {...this.state.statesInformation}
    let currentSales = statesInformation[currentStateName]

    delete statesInformation[currentStateName]

    statesInformation[updatedStateName] = currentSales
    this.setState({statesInformation})
  }
  updateSalesAmount = (currentStateName, newSalesAmount) => {
    let statesInformation = {...this.state.statesInformation}
    // let currentSales = statesInformation[currentStateName]

    // delete statesInformation[currentStateName]

    statesInformation[currentStateName] = newSalesAmount
    this.setState({statesInformation})
  }

  removeStateInfo = (stateAbbreviation) =>{ 
    let statesInformation = {...this.state.statesInformation}
    delete statesInformation[stateAbbreviation]
    this.setState({statesInformation})
  }

  addFederalInfo = (federalInfo) =>{
    this.setState({federalTaxableIncome:federalInfo})
  }

  isSelected = stateAbbreviation => this.state.statesInformation[stateAbbreviation] != undefined

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  getStatesDropdown = () => {
    return(
      <div>
      <select className="new-state-select" name='newState' value={this.state.newState} onChange={this.handleChange}>
        {this.state.stateList.map(sa => {
          return <option value={sa}>{sa}</option>
        })}
      </select>
      </div>
    )
  }

  sendInformationtoDB = async () =>{

    let info ={...this.state}
    let result = await axios.post('http://localhost:7878/datatowork', info ) 
    this.props.setResult(result.data)
    alert("Please pass to Step 2")

  }
  
  render() {
    
    let stateInputNames = Object.keys(this.state.statesInformation)

    return (
      <div className="ClientInput">
      <span>Enter Federal Taxable Income</span>
      <FederalTaxableIncome addFederalInfo = {this.addFederalInfo}/>
      <div className="state-drop-down">{this.getStatesDropdown()} 
      <button onClick={this.addStateInfo}>Add State</button></div>
      {stateInputNames.length === 0 ? this.getStatesDropdown() : 
        stateInputNames.map(stateAbbreviation => {
          return <StateInformation 
            abbreviation={stateAbbreviation}
            remove={this.removeStateInfo}
            update={this.updateStateSelection}
            updateSales={this.updateSalesAmount}
            availableStates={this.state.stateList}
        />})
      }
     
    <button onClick={this.sendInformationtoDB} className="review-texas-submit">Submit for Tax Calculation</button>
      </div>
    );
  }
}

export default ClientInput ;