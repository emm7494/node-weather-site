const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/17e704dcb05c032392171209c096a575/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to forecasting sevices!!!', undefined);
        } else {
            const { body } = response;
            if (body.error) {
                console.log(body.error);
                callback('Unable to find location!!!', undefined);
            } else {
                const { currently: period } = body;
                callback(undefined, period);
            }
        }
    });
};


module.exports = forecast;


