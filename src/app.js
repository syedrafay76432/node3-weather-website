const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocoding = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;
const app = express();
//defins path for express
const PudblicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to setup 
app.use(express.static(PudblicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Use this site to get your weather'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Syed Rafay '
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'This is something helpful'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Syed Rafay '
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        console.log(req.query.address)
        geocoding(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                console.log("error")
                res.send({error})
            } else {
                forecast(latitude, longitude, (error, forecastdata) => {
                    if (error) {
                        res.send({error})
                    }
                    res.send({
                        location,
                        forecastdata
                    })
    
                })
            }
        })
    }
    else{
        return res.send({error:'Error while finding address'})
    }

})
app.get('/help/*', (req, res) => {
    res.send('Page not found')
})
app.get('*', (req, res) => {
    res.send('My 404 page')

})

app.listen(port, () => {//it start up the server and listen on a specific  port
    console.log('Server is up on port '+port)
})