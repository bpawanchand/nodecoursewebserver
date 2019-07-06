const chalk = require('chalk')
const request = require('request')
// const fs = require('fs') // This npm is not yet installed
// const validator = require('validator') // This NPM is not yet installed

const displayTemp = (locality, url) => {
    request({ uri: url, json: true }, (error, response, body) => {
        console.log(chalk.yellow.inverse(`The temperature is ${body.currently.temperature} degrees hot.`))
    })

}

const displayRain = (locality, url) => {
    request({ url: url, json: true }, (e, r, b) => {
        console.log(chalk.yellow.inverse(`There is ${b.currently.precipProbability}% of rain.`))
    })
}

const displayCurrently = (locatlity, url) => {
    request({ url: url, json: true }, (e, r, b) => {
        console.log(chalk.red.inverse(`The current weather forecast information is as follows:`))
        console.log(b.currently)
    })
}

const displayTempRain = (locality, url) => {
    request(url, (e, r, b) => {
        const dataParsed = JSON.parse(b)
        console.log(chalk.cyan.inverse(`It is currently ${dataParsed.currently.temperature} degrees hot.`))
        console.log(chalk.cyan.inverse(`There is a ${dataParsed.currently.precipProbability}% chance of rain.`))
    })
}

const getCoordinates = (city, country, key, url, callback) => {
    const buildUrl = url + city + '%20' + country + '.json?' + 'types=country&types=place' + key

    request({ uri: buildUrl, json: true }, (e, r, b) => {
        if (e) {
            // debugger
            callback('Could Connect to MapBox Geocoding Service API', 'undefined', 'undefined')
            // console.log(chalk.red.inverse(`Unable to connect to Mapbox`))
        } else if (b.features.length === 0) {
            // debugger
            callback('Search Failed to identify the city', 'undefined', 'undefined')
            // console.log(chalk.red.inverse(`The search failed to pull latitude and logitude for city ${city} and for country ${country}.`))
        } else {
            // debugger
            // console.log(`The latitude of ${city} is ${chalk.green.inverse(b.features[0].geometry.coordinates[0])}`)
            // console.log(`The longitude of ${city} is ${chalk.green.inverse(b.features[0].geometry.coordinates[1])}`)
            callback(null, r, b)
        }

    })

}

const getForecast = (latitude, longitude, dsKey, dsUrl, callback) => {
    const buildUrl = dsUrl + dsKey + latitude + ',' + longitude + '?units=si'
    request({ uri: buildUrl, json: true }, (e, r, b) => {
        if (e) {
            // debugger
            callback('Failed to reach DarkSky Api', 'undefined', 'undefined')
        } else if (b.code === 400) {
            // debugger
            callback('Poor Co-ordinate search, provide a valid co-ordinates', 'undefined', 'undefined')
        } else {
            // debugger
            callback(null, r, b)
        }
    })

}

const getCityTemp = (country, city, callback) => {
    const dsUrl = 'https://api.darksky.net/forecast/'
    const dsKey = '41b031be2b49f50055a688555111d6da/'
    const mbUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const mbKey = '&access_token=pk.eyJ1IjoiYnBhd2FuY2hhbmQiLCJhIjoiY2p4aDdyeXF2MWUxcTN4czg4cXc2aWxsNSJ9.0yO-2oeKYR_2b9CP4Xr1vw'
    // debugger
    getCityCords(country, city, mbKey, mbUrl, (e, r, b) => {
        if (e) {
            // debugger
            console.log(e)
        } else if (b.features.length === 0) {
            // debugger
            console.log(e)
        } else {
            // debugger
            const location = b.features[0].place_name
            const cityName = b.features[0].text
            getForecast(b.features[0].geometry.coordinates[1], b.features[0].geometry.coordinates[0], dsKey, dsUrl, (e, r, b) => {
                /*  console.log(`The specific Location is: ${location}`)
                 console.log(`The temperature in ${city} is ${b.currently.temperature} degeers hot.`)
                 console.log(`The probability of rain is ${b.currently.precipProbability}% in ${cityName}`)
                 console.log() */
                callback(null, r, b)
            })
        }

    })
}

/* const getCityTemp = (country, city, dsKey, dsUrl, mbKey, mbUrl, () => {
    getCityCords(country, city, mbKey, mbUrl, (e,r) => {

    })
}) */

const getCityCords = (country, city, key, url, callback) => {
    getCoordinates(city, country, key, url, (e, r, b) => {
        callback(e, r, b)
    })
}

/* const getCityCords = (country, city, key, url, (latitude, longitude) => {


})
 */
module.exports = {
    displayTemp: displayTemp,
    displayRain: displayRain,
    displayCurrently: displayCurrently,
    displayTempRain: displayTempRain,
    getCoordinates: getCoordinates,
    getCityTemp: getCityTemp
}