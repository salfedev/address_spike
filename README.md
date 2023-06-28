## Installation
1. Add a .env file to the root of the project and add you API key under ADDRESS_API_KEY
2. Install deps: `npm i`
3. `npm run dev`

## Usage
1. start the app in browser
2. search for an address using a post code or building number and street name
3. profit?

## Spike details
* The API used is getAddress.io it is a free service, but it is limited to 20 requests per day, 
it's used for POC only, it is not recommended to use it in production
we should use the recommended API by gov.uk:
  * ### OS Places API
    *details*: https://www.api.gov.uk/os/os-places-api/#os-places-api

    *documentation* : https://osdatahub.os.uk/docs/places/gettingStarted

* Frontend used is govuk-frontend + govuk-protoype-kit

* The patterns and accessibility research are proudly ripped off from DWP!
https://design-system.dwp.gov.uk/patterns/find-an-address/