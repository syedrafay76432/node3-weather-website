const request = require('request')
const forecast = (Latitude, Longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6b561342ecfc4c4ed35b295bc409aa17&query=' + (Latitude) + ',' + (Longitude)
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Something went wrong check your internet connection',undefined);
        } else if (body.error) {
            callback('Unable to find weather',undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degree out,' + " its feels like " + body.current.feelslike + ' degree out');
        }
    })

}

module.exports = forecast;