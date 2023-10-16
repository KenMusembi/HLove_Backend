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

//routes to gender crud
app.get('/genders', dbqueries.getGenders)
app.get('/genders/:id', dbqueries.getGenderById)
app.post('/genders', dbqueries.createGender)
app.put('/genders/:id', dbqueries.updateGender)
app.delete('/genders/:id', dbqueries.deleteGender)

//routes to grade crud
app.get('/grades', dbqueries.getGrades)
app.get('/grades/:id', dbqueries.getGradeById)
app.post('/grades', dbqueries.createGrade)
app.put('/grades/:id', dbqueries.updateGrade)
app.delete('/grades/:id', dbqueries.deleteGrade)

//routes to hiv_status crud
app.get('/hiv-status', dbqueries.getHIVStatus)
app.get('/hiv-status/:id', dbqueries.getHIVStatusById)
app.post('/hiv-status', dbqueries.createHIVStatus)
app.put('/hiv-status/:id', dbqueries.updateHIVStatus)
app.delete('/hiv-status/:id', dbqueries.deleteHIVStatus)

//routes to interest crud
app.get('/interests', dbqueries.getInterests)
app.get('/interests/:id', dbqueries.getInterestById)
app.post('/interests', dbqueries.createInterest)
app.put('/interests/:id', dbqueries.updateInterest)
app.delete('/interests/:id', dbqueries.deleteInterest)


//routes to occupation crud
app.get('/occupations', dbqueries.getOccupations)
app.get('/occupations/:id', dbqueries.getOccupationById)
app.post('/occupations', dbqueries.createOccupation)
app.put('/occupations/:id', dbqueries.updateOccupation)
app.delete('/occupations/:id', dbqueries.deleteOccupation)

//routes to personalities crud
app.get('/personalities', dbqueries.getPersonalities)
app.get('/personalities/:id', dbqueries.getPersonalityById)
app.post('/personalities', dbqueries.createPersonality)
app.put('/personalities/:id', dbqueries.updatePersonality)
app.delete('/personalities/:id', dbqueries.deletePersonality)

//routes to signs crud
app.get('/signs', dbqueries.getSigns)
app.get('/signs/:id', dbqueries.getSignsById)
app.post('/signs', dbqueries.createSigns)
app.put('/signs/:id', dbqueries.updateSigns)
app.delete('/signs/:id', dbqueries.deleteSigns)

app.listen(port, () =>{
    console.log(`HLove running on port ${port}.`)
})

