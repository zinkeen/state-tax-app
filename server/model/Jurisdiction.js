const mongoose = require ('mongoose')
const Schema = mongoose.Schema



//  Discuss with Jona  - the  _id  issue - why it took json file id and not the generated id

// Ask about mongod connection port
const jurisdictionSchema = new Schema({
    name: String,
    taxrate: Number,
    minimumtax: Number,
    salesFactorWeight: Number,
    propertyFactorWeight: Number,
    payrollFactorWeight: Number,
    localTax:Boolean,
    economicNexus: Boolean,
    franchiseTax: Boolean,
    singlesales: Boolean,


})

const Jurisdiction = mongoose.model("Jurisdiction", jurisdictionSchema)
 //  Creating the DB 
//  const data = require('../model/jurisdictions.json')

/*  data.forEach(j=>{
    let jurisdiction =new Jurisdiction(j)
    jurisdiction.save()
}) 
 */

module.exports = Jurisdiction 