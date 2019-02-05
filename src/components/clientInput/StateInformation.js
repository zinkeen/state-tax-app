import React, { Component } from 'react';

class StateInformation extends Component {
  constructor(props){
    super(props)
    this.state = {
     stateName :'',
     sales:0,
    //  apportionment:0,
    //  previouslyfiled:true
    }
  }
  handleEvent = (event) =>{
    let currentState = this.state.stateName
    let updatedState = event.target.value
    this.setState({stateName:updatedState}, ()=>console.log(this.state))
    this.props.updateStateSelection(currentState, updatedState)
  }

  addStateInfo = () =>{
    let salesAmount = Number(this.state.sales)
    console.log(salesAmount)
    this.props.addStateInfo({stateName:this.state.stateName, sales: salesAmount})
    // this.setState({stateName :'', sales:0})
  }

  removeStateInfo = (event) =>{
    console.log(event.target.name)
    this.props.removeStateInfo(event.target.name)
    this.setState({stateName :'', sales:0})
  }

  isSelected = s =>{
    return this.props.isSelected(s)
  }

  render() {
    const statelist = [
      ' ',
      'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA',
      'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA',
      'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
      'OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
      'VT','VI','VA','WA','WV','WI','WY'
     ]
    return (
      <div className="StateInformation">
     
      <select id="states" name ="stateName" value={this.state.stateName} 
      onChange={this.handleEvent}>
        {statelist.filter(s => !this.isSelected(s)).map(state=><option value={state}>{state}</option>)}
      </select>
      <input type ="number" name="sales" value = {this.state.sales}  onChange ={this.handleEvent} placeholder = "Enter Sales"/>
      
      <button onClick ={this.addStateInfo}>+</button>
      <button name = {this.state.stateName} onClick ={this.removeStateInfo}>-</button>
     
      </div>
    );
  }
}

export default StateInformation;