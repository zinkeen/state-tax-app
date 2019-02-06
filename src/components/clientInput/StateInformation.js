import React, { Component } from 'react';

class StateInformation extends Component {
  constructor(props){
    super(props)
    this.state = {
     stateName :props.abbreviation,
     sales:0
    }
  }

  removeStateInfo = (e) => this.props.remove(e.target.name)

  // removeStateInfo = () => this.props.remove(this.state.stateName)
  handleChange = (e) => {
    let currentStateName = this.state.stateName
    let newStateName = e.target.value
    console.log(e.target.value)
    this.setState({stateName: newStateName})
    this.props.update(currentStateName, newStateName)
   
  }

  handleEvent = (e) =>{
    let newSales = Number(e.target.value)
    let currentInfo = {...this.state}
    console.log(currentInfo)
    currentInfo.sales=newSales
    this.setState({sales: currentInfo.sales})
    this.props.updateSales(currentInfo.stateName, newSales)
  }


  render() {
    
    return (
      <div className="StateInformation">
     
      <select id="states" name ="stateName" value={this.state.stateName} 
      onChange={this.handleChange}>
        {this.props.availableStates.map(state=><option value={state}>{state}</option>)}
      </select>
      
      <input type ="number" name={this.state.stateName} value = {this.state.sales}  onChange ={this.handleEvent} placeholder = "Enter Sales"/>
    
      <button name = {this.state.stateName } onClick ={this.removeStateInfo}>-</button>
     
      </div>
    );
  }
}

export default StateInformation;