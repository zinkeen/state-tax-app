import React, { Component } from 'react';

class FederalTaxableIncome extends Component {
  constructor(props){
    super(props)
    this.state = {
     federalTaxableIncome: 0
    }
  }
  handleEvent = (event) =>{
    this.setState({federalTaxableIncome: Number(event.target.value)}, ()=>console.log(this.state))
  }
  addFederalInfo = () =>{
    this.props.addFederalInfo(this.state.federalTaxableIncome)
  }
  render() {
    return (
      <div className="FederalTaxableIncome">
      <input type = "Number" onChange = {this.handleEvent} placeholder = "Enter FTI"/>
      <button onClick ={this.addFederalInfo}>Submit</button>
      </div>
    );
  }
}

export default FederalTaxableIncome;