import React, { Component } from 'react';

class Totals extends Component {
  getTotalSales = () =>{
    let totalSales=0
    let statesProvided = this.props.items
    statesProvided.forEach(singleState =>{totalSales+=singleState.salesAmount})
    return totalSales 
} 
  getTotalTaxes = () =>{
  let totalTaxes=0
  let statesProvided = this.props.items
  statesProvided.forEach(singleState =>{totalTaxes+=singleState.stateTax})
  return totalTaxes
} 

getTotalFilingStates = () =>{
  let total=this.props.items.length
  return total
}
  render() {
    
     
    return (
      <div className="totalstax"> 
      <p> Total States Filed   {this.getTotalFilingStates()}</p>
      <p></p>
      <p></p>
      <p>Total Sales  {this.getTotalSales()}</p>
      <p></p>
      <p></p>
      <p> Total Tax to Pay ${this.getTotalTaxes()}</p>
      </div>
    );
    }
}

export default Totals;