const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFqYWpvbiIsImEiOiJja3JrZ2VhY2IwMzRmMm9udno2NXQwbDNsIn0.NKIG7jtrDkpmIuSHBAlhjw&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect.', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find ocation.', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode 