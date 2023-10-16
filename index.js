const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbqueries = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({
        info: 'HLove Backend API'
    })
})

//routes to users crud
app.get('/users', dbqueries.getUsers)
app.get('/users/:id', dbqueries.getUserById)
app.post('/users', dbqueries.createUser)
app.put('/users/:id', dbqueries.updateUser)
app.delete('/users/:id', dbqueries.deleteUser)

//routes to admin crud
app.get('/admins', dbqueries.getAdmins)
app.get('/admins/:id', dbqueries.getAdminById)
app.post('/admins', dbqueries.createAdmin)
app.put('/admins/:id', dbqueries.updateAdmin)
app.delete('/admins/:id', dbqueries.deleteAdmin)

//routes to county crud
app.get('/counties', dbqueries.getCounties)
app.get('/counties/:id', dbqueries.getCountyById)
app.post('/counties', dbqueries.createCounty)
app.put('/counties/:id', dbqueries.updateCounty)
app.delete('/counties/:id', dbqueries.deleteCounty)

//routes to country crud
app.get('/countries', dbqueries.getCountries)
app.get('/countries/:id', dbqueries.getCountryById)
app.post('/countries', dbqueries.createCountry)
app.put('/countries/:id', dbqueries.updateCountry)
app.delete('/countries/:id', dbqueries.deleteCountry)

app.listen(port, () =>{
    console.log(`HLove running on port ${port}.`)
})

