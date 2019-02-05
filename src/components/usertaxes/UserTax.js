import React, { Component } from 'react';

class UserTax extends Component {
 
 
  render() {
    let clienttax = this.props.item || {}
      let stateName = clienttax.activeStateName
      let federalTI = clienttax.federalTaxableIncome
      let apportionment = clienttax.apportionment
      let statesalesAmount = clienttax.salesAmount
      let stateTI = clienttax.stateTaxableIncome
      let stateTR = clienttax.taxLaw.taxrate
      let statetax = clienttax.stateTax
    
   
    return (
      <div className="clienttax" > 
    <p>{stateName} </p> 
      <p>{federalTI} </p> 
      <p>{apportionment}% </p> 
      <p>{statesalesAmount} </p> 
      <p>{stateTI} </p> 
      <p>{stateTR} </p> 
      <p>${statetax} </p> 
      
      </div>
    );
    }
}

export default UserTax;