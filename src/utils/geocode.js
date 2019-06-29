const request = require('request')

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2FuamVldmtzMTAxIiwiYSI6ImNqd2VncWdhNjFoMW80NG82cnZmejJmb2cifQ.g4ZuINtNALqBjKfHBT1TKA&limit=1'
    request({url,json: true},(error, {body}) => {
        if(error){
            callback('Unable to connect to location Service', undefined)
        } else if(body.features.length == 0){
            callback('Unable to find location. Try with different search', undefined)
        } 
        else{
            // const featureData = response.body.features[0]
            // const latitude = featureData.center[1]
            // const longitude = featureData.center[0]
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }

    })
}

module.exports = geoCode