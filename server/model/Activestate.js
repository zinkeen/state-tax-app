const mongoose = require ('mongoose')
const Schema = mongoose.Schema
// mongoose.connect('mongodb://localhost/activestatesDB', { useNewUrlParser: true })
const Model  = require('./Jurisdiction')
const jurisdictionSchema=Model.jurisdictionSchema



// Ask about mongod connection port
const activeStateSchema = new Schema({
    activeStateName: String,
    salesAmount: Number,
    payrollAmount: Number,
    propertyAmount: Number,
    federalTaxableIncome: Number,
    apportionment:Number,
    adjustedFederalTaxableIncome: Number,
    previouslyfiled: Boolean,
    adjustment:Number,
    stateTaxableIncome:Number,
    stateTax:Number,
    taxLaw: jurisdictionSchema


})

const ActiveState = mongoose.model("ActiveState", activeStateSchema )

//   Creating the DB 
/*  const data = require('../model/activestates.json')

 data.forEach(a=>{
    let activeState =new ActiveState(a)
    activeState.save()
})  */
// taxLaw: {type: Schema.Types.ObjectId, ref: 'Jurisdiction'}

module.exports = ActiveState

