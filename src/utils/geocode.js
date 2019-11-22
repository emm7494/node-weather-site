const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZW1tNzQ5NCIsImEiOiJjazMxa21ldmcwOWEzM2hzM2Jra2Z0c3dhIn0.w4fzMBtEHkPI-3MTaxM9ZQ&limit=1`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!!!', undefined);
        } else {
            const { features: featuresArray } = response.body;
            if (featuresArray.length === 0) {
                callback('Unable to find location. Try another search!!!', undefined);
            } else {
                const features = featuresArray[0];
                callback(undefined, features);
            }
        }
    });
};

module.exports = geocode;