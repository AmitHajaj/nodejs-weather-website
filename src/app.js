const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for engine
const publicDir = path.join(__dirname, '../public')
const viwesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viwesPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Amit Hajaj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Amit Hajaj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: 'This is an help page',
        name: 'Amit Hajaj'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })    
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amit Hajaj',
        errorMessage: 'Page not found'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amit Hajaj',
        errorMessage: 'Help article not found' 
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



