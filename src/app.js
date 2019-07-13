const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utilities = require('./utilities')
//Start Express Server
const app = express()

const publicDir = path.join(__dirname, '../public')
const templates = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

const port  = process.env.PORT || 3000
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

// Set path for Express server
app.set('view engine', 'hbs')
app.set('views', templates)
hbs.registerPartials(partials)

app.use(express.static(publicDir))
//  Home Page
/* app.get('', (req, res) => {
    res.send('<h1>Welcome to Home Page</h1>')
}) */

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pavan Bhamidipati'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pavan Bhamidipati'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pavan Bhamidipati'
    })
})

app.get('/weather', (req, res) => {
    
    if (!(req.query.country)) {
        return res.send({
            Error: "Provide an City and Country..."
        })
    } else {
        utilities.getCityTemp(req.query.country, req.query.city, (e, r, b) => {
            return res.send({
                latitude:b.latitude,
                longitude: b.longitude,
                conditon: b.currently.summary,
                rainchances: b.currently.precipProbability

            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            Error: "Provide a search string"
        })
    }

    return res.send({
        Search: req.query.search
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'No Help',
        name: 'Pavan Bhamidipati',
        description: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: 'OOPS...!',
        name: 'Pavan Bhamidipati',
        description: 'Page not found'
    })
})

app.listen(port, app.com, () => {
    console.log('Server is listening to port' + port + '....')
})

/* app.get('/help', (req, res) => {
    res.send([
        {
            "name": "Pavan",
            "Age": 35
        },

        {
            "name": "PTanmayee",
            "Age": 8
        }
    ])
}) */

/* app.get('/about', (req, res) => {
    res.send('<h1>Welcome to About Page</h1>')
}) */

