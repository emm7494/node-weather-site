const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const { geocode, forecast } = require('./utils');

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup handlebars templating engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Emmanuel'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Adu'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gyamfi',
        message: 'Don\'t panic.'
    });
});
app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'Please provide an address!'
        });
    }
    geocode(address, (error, {
        place_name: location,
        center: coordinates
    } = {}) => {
        if (error) {
            console.log(error);
            return res.send({
                error
            });
        }
        //        const {
        //            place_name: location,
        //            center: coordinates
        //        } = features;
        console.log(location);
        console.log(coordinates[1], coordinates[0]);
        forecast(coordinates[1], coordinates[0], (error, {
            summary,
            temperature,
            precipProbability: precipitation,
            windSpeed: windspeed
        } = {}) => {
            if (error) {
                console.log(error);
                return res.send({
                    error
                });
            }
//            const {
//                summary,
//                temperature,
//                precipProbability: precipitation
//            } = period;
            console.log(`${summary}. It is currently ${temperature} degrees. The windspeed is ${windspeed}. There is a ${precipitation} chance of rain.`);
            res.send({
                title: 'Weather',
                location,
                summary,
                temperature,
                precipitation,
                windspeed
            });
            console.log(chalk.inverse.cyan('forecast ended!!!'));
        });

        console.log(chalk.inverse.cyan('geocode ended!!!'));
    });
    console.log(chalk.inverse.magenta('Please Wait...'));
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        resource: 'Help article',
        name: 'Gyamfi'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        resource: 'Page',
        name: 'Emmanuel'
    });
});

app.listen(port, () => {
    console.log(`Serving weather_app at port ${port}...`);
});