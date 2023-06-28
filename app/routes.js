//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const fetch = require('node-fetch')
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
require('dotenv').config()

const ADDRESS_API_KEY = process.env.ADDRESS_API_KEY

const handlerAddress = async (req, res) => {
  const {postcode} = req.session.data
  // this api is 
  // getAddress.io is a free service, but it is limited to 20 requests per day
  // it's used for POC only, it is not recommended to use it in production
  // we should use the recommended api from the gov.uk
  // OS Places API
  // details: https://www.api.gov.uk/os/os-places-api/#os-places-api
  // documentation : https://osdatahub.os.uk/docs/places/gettingStarted
  // Frontend used is govuk-frontend + govuk-protoype-kit
  // the patterns and accessibility research are proudly ripped off from DWP!
  // https://design-system.dwp.gov.uk/patterns/find-an-address/

  const url = `https://api.getAddress.io/find/${postcode}?api-key=${ADDRESS_API_KEY}`
  let data = {}
  try {
    const response = await fetch(url)
    data = await response.json()
  } catch (error) {
    console.log('error:', error)
  }
  const addresses = data.addresses.map(address => {
    
    const [line1, line2, line3, line4, town, county, postcode] = address.split(',')
    return {line1, line2, line3, line4, town, county, postcode}
  })

  const addressesFormated = addresses.map(address => {
    return {
      value: address.line1 + ', ' + address.postcode,
      text: address.line1 + ', ' + address.postcode
    }
  });

  req.session.data.addresses = addresses
  console.log('here: ', addressesFormated);
  
  res.render('/result', { formattedAddresses: addressesFormated})
}


// Add your routes here
router.post('/index', async (req, res) => {
  console.log("REQUEST:---", req.body)
  // const {postcode, searchString } = req.body
  // req.session.data = {postcode, searchString}
  // search for the postcode, 
  // res.redirect('/result')
  await handlerAddress(req, res)
});