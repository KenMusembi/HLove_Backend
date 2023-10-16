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
        info: 'Node.JS, Express, and Postgres API'
    })
})

app.get('/users', dbqueries.getUsers)
app.get('/users/:id', dbqueries.getUserById)
app.post('/users', dbqueries.createUser)
app.put('/users/:id', dbqueries.updateUser)
app.delete('/users/:id', dbqueries.deleteUser)

app.listen(port, () =>{
    console.log(`App running on port ${port}.`)
})

