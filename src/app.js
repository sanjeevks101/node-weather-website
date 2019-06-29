const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebar engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sanjeev Singh'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Sanjeev Singh'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'This is help Page',
        name:'Sanjeev Singh'
    })
})

// app.get('/help/*',(req,res) => {
//     res.send('Help Article Not Found')
// })

// app.get('*',(req,res) => {
//     res.render('404page',{
//         title:'This is a 404 Page',
//         name:'Sanjeev Singh'
//     })
// })

// const aboutPath = path.join(__dirname,'../public/about.html')
// app.use(express.static(aboutPath))

// const helpPath = path.join(__dirname,'../public/about.html')
// app.use(express.static(helpPath))

app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address'
        })
    }
    
    geocode(req.query.address,(error,{Latitude,Longitude,Location}) => {
        if(error){
            return res.send({error})
        }
        forecast(Longitude,Latitude,(error,forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                Location,
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
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

// app.listen(3000, () => { commented for Heroku
app.listen(port, () => {    
    console.log('Server is up on port'+ port)
})