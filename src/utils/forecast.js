const request = require('request')

const forecast = (lng, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b9b800d73f7b689aaebb2905439dac38&query=' + lat + ',' + lng + '&units=m'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect.', undefined)
        }
        else if(body.error){
            callback('Unable to find location.', undefined)
        }
        else{
            callback(undefined, {
                temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                msg: "It is cuurently " + body.current.temperature + " degrees. And feels like " + body.current.feelslike
            })
        }
    })
}

module.exports = forecast