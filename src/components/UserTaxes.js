import React, { Component } from 'react';
import axios from 'axios'
import UserTax from './usertaxes/UserTax'
import LoadBar from './usertaxes/LoadBar'
import Totals from './usertaxes/Totals'
import './usertaxes/UserTaxes.css'

class UserTaxes extends Component {
  constructor(props){
    super(props);
    this.state = {
      usertaxes : this.props.result

    }
  }

  // getData(){
  //   return axios.get ("http://localhost:7878/stateapportionment")
  // }
  // async componentDidMount() {
  //   let items = await this.getData()
  //   // console.log(items)
  //    this.setState({ usertaxes: this.props.result})
  // } 
  render() {
    let usertaxes =[...this.state.usertaxes]
    return ( 
      
     <div className="UserTaxes">
       <LoadBar/>
       {usertaxes.map(state =><UserTax key= {state._id} item = {state}/>)}
       <Totals items = {usertaxes}/> 
      </div>
    )
  }
}

export default UserTaxes;