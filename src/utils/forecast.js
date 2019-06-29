const request = require('request')

const foreCast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2721aacc70693f987a3f478370d2bf08/'+ longitude +','+ latitude
    request({url,json : true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather Service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary+' It is currently '+ body.currently.temperature +' degrees out. The high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow +'. There is a '+ body.currently.precipProbability  + '% chance of rain.')
        }
    })
}

module.exports = foreCast