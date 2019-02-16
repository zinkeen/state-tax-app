const express = require ('express')
const router = express.Router()

const ActiveState = require('../model/Activestate')
const Model  = require('../model/Jurisdiction')
const Jurisdiction=Model.jurisdiction


// Sanity Test
router.get ('/sanity', function (req, res){
    res.send('OK')
    console.log("passed sanity test")
})

//  get all data 

router.get('/stateapportionment', async function(req, res){
    const states = await ActiveState.find({}).populate("taxLaw")
    let totalsales = 0
    states.forEach(s=>{totalsales+=s.salesAmount})
    states.forEach(s=>s.apportionment=Math.round((s.salesAmount/totalsales)*100))
    states.forEach(s=>s.stateTaxableIncome=(s.apportionment*s.federalTaxableIncome)/100) 
    states.forEach(s=>s.stateTax = Math.round((s.stateTaxableIncome*s.taxLaw.taxrate)))
    res.send(states)
    })

//  get Client By name 
/* router.get ('/client', function (req, res){
    Client.find({},'name owner emailType sold')
    .exec(function(err, results){
        res.send(results)
    })
}) */



/* router.get ('/chosenone/:name',  async function (req, res){

    const state = await ActiveState.findOne({activeStateName: req.params.name})
    const jurisdiction = await  Jurisdiction.findOne({name: req.params.name})
    
}) */

router.post ('/datatowork', async function (req, res){

    let datatowork = req.body
    let objectToTransform = datatowork.statesInformation
    let statesArray = Object.keys(objectToTransform).map(function(key) {
        return  {stateName:key, sales:Number(objectToTransform[key])}  
      })

     let result = statesArray.map(async(state)=>{
        let jurisdictionName = state.stateName
        let jurisdiction  = await Jurisdiction.findOne({name:jurisdictionName})
        let newState = await new ActiveState({
        activeStateName: state.stateName,
        salesAmount: state.sales,
        payrollAmount: 0,
        propertyAmount: 0,
        federalTaxableIncome: datatowork.federalTaxableIncome,
        apportionment:0,
        adjustedFederalTaxableIncome:0,
        previouslyfiled: true,
        adjustment:0,
        stateTaxableIncome:0,
        stateTax:0,
        taxLaw: jurisdiction
        })

      return newState
    
    
    }) 
    const finalArray = await Promise.all(result)
    let totalsales = 0
    await finalArray.forEach(s=>{totalsales+=s.salesAmount})
    await finalArray.forEach(s=>s.apportionment=Math.round((s.salesAmount/totalsales)*100))
    await finalArray.forEach(s=>s.stateTaxableIncome=(s.apportionment*s.federalTaxableIncome)/100) 
    await finalArray.forEach(s=>s.stateTax = Math.round((s.stateTaxableIncome*s.taxLaw.taxrate)))
    await console.log(finalArray)
     await res.send(finalArray)

   
})
// Post new item
//  Post request - finds the id for the jurisdiction based on name and saves the state
// router.post ('/state',   async function (req, res){
//     let jurisdictionName = req.body.activeStateName
//     let jurisdiction  =  await Jurisdiction.findOne({name:jurisdictionName})
//     let newState = new ActiveState({
//         activeStateName: req.body.activeStateName,
//         salesAmount: req.body.salesAmount,
//         payrollAmount: req.body.payrollAmount,
//         propertyAmount: req.body.propertyAmount,
//         federalTaxableIncome: req.body.federalTaxableIncome,
//         apportionment:req.body.apportionment,
//         adjustedFederalTaxableIncome: req.body.adjustedFederalTaxableIncome,
//         previouslyfiled: req.body.previouslyfiled,
//         adjustment:req.body.adjustment,
//         stateTaxableIncome:req.body.stateTaxableIncome,
//         stateTax:req.body.stateTax,
//         taxLaw: jurisdiction._id

//     })
//     newState.save()
//     res.send(newState)
// })

//  Update Client by owner A.findByIdAndUpdate(id, update, callback) // executes
// router.put('/client', function (req, res){
// Client.findByIdAndUpdate(req.body._id, {
//     name: req.body.name,
//     owner:req.body.owner,
//     emailType: req.body.emailType,
//     sold:req.body.sold
// }, {new:true})
// .exec(function(err, result){
//     res.send(result)
// })
// })


//  Update Email Status
// router.put('/updateEmail', function (req, res){
//     Client.findByIdAndUpdate(req.body._id, {email:req.body.newEmail}, {new:true})
//     .exec(function(err, result){
//         res.send(result)
//     })
//     })



// Update sale status to true
// router.put('/updateStatus',function (req, res){
//     Client.findByIdAndUpdate(req.body._id, {sold:true}, {new:true})
//     .exec(function(err, result){
//         res.send(result)
//     })
//     })

    // Update country
// router.put('/updateCountry',function (req, res){
//     Client.findByIdAndUpdate(req.body._id, {country: req.body.newCountry }, {new:true})
//     .exec(function(err, result){
//         res.send(result)
//     })
//     })

    // router.put('/updateName',function (req, res){
    //     Client.findByIdAndUpdate(req.body._id, {name: req.body.newName }, {new:true})
    //     .exec(function(err, result){
    //         res.send(result)
    //     })
    //     }) 
//  To DO  - update client name
module.exports = router