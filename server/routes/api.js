const express = require ('express')
const router = express.Router()

const ActiveState = require('../model/Activestate')
const Jurisdiction  = require('../model/Jurisdiction')


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


// Post new item
//  Post request - finds the id for the jurisdiction based on name and saves the state
router.post ('/state',   async function (req, res){
    let jurisdictionName = req.body.activeStateName
    let jurisdiction  =  await Jurisdiction.findOne({name:jurisdictionName})
    let newState = new ActiveState({
        activeStateName: req.body.activeStateName,
        salesAmount: req.body.salesAmount,
        payrollAmount: req.body.payrollAmount,
        propertyAmount: req.body.propertyAmount,
        federalTaxableIncome: req.body.federalTaxableIncome,
        apportionment:req.body.apportionment,
        adjustedFederalTaxableIncome: req.body.adjustedFederalTaxableIncome,
        previouslyfiled: req.body.previouslyfiled,
        adjustment:req.body.adjustment,
        stateTaxableIncome:req.body.stateTaxableIncome,
        stateTax:req.body.stateTax,
        taxLaw: jurisdiction._id

    })
    newState.save()
    res.send(newState)
})

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