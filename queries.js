const dbconfig = require('./dbconfig')

//function to get all the users
const getUsers = (request, response) => {
    dbconfig.pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single user by ID
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new user to the db
const createUser = (request, response) => {
    const { username, first_name, middle_name, last_name, email, phone_number, date_of_birth, description, location,
    location_latitude, location_longitude, number_of_children, popularity} = request.body
  
    dbconfig.pool.query('INSERT INTO users (username, first_name, middle_name, last_name, email, phone_number, date_of_birth, description, location, location_latitude, location_longitude, number_of_children, popularity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', 
    [username, first_name, middle_name, last_name, email, phone_number, date_of_birth, description, location,
        location_latitude, location_longitude, number_of_children, popularity], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }

//function to update an existing user
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {username, first_name, middle_name, last_name, email, phone_number, date_of_birth, description, location,
        location_latitude, location_longitude, number_of_children, popularity} = request.body

    dbconfig.pool.query(
        'UPDATE users SET username = $1, first_name = $2, middle_name = $3, last_name = $4, email = $5, phone_number = $6, date_of_birth = $7, description = $8, location = $9, location_latitude = $10, location_longitude = $11, number_of_children = $12, popularity = $13 WHERE id = $14',
        [username, first_name, middle_name, last_name, email, phone_number, date_of_birth, description, location,
            location_latitude, location_longitude, number_of_children, popularity, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)//returns this even if no user exists with that id
        }
    )
}

//function to delete a user
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM users WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

//function to get all the admins
const getAdmins = (request, response) => {
    dbconfig.pool.query('SELECT * FROM admin ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single admin by ID
const getAdminById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM admin WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new admin
const createAdmin = (request, response) => {
    const { username, email } = request.body
  
    dbconfig.pool.query('INSERT INTO admin (username, email) VALUES ($1, $2)', [username, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Admin added with ID: ${results.insertId}`)
    })
  }

//function to update an existing admin
const updateAdmin = (request, response) => {
    const id = parseInt(request.params.id)
    const {username, email} = request.body

    dbconfig.pool.query(
        'UPDATE admin SET username = $1, email = $2 WHERE id = $3',
        [username, email, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Admin modified with ID: ${id}`)
        }
    )
}

//function to delete an admin
const deleteAdmin = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM admin WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`Admin deleted with ID: ${id}`)
    })
}

//function to get all the counties
const getCounties = (request, response) => {
    dbconfig.pool.query('SELECT * FROM counties ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single county by ID
const getCountyById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM counties WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new county
const createCounty = (request, response) => {
    const { county_code, name, active } = request.body
  
    dbconfig.pool.query('INSERT INTO counties (county_code, name, active) VALUES ($1, $2, $3)', [county_code, name, active], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`County added with ID: ${results.insertId}`)
    })
  }

//function to update an existing county
const updateCounty = (request, response) => {
    const id = parseInt(request.params.id)
    const {county_code, name, active} = request.body

    dbconfig.pool.query(
        'UPDATE counties SET county_code = $1, name = $2, active = $3 WHERE id = $4',
        [county_code, name, active, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`County modified with ID: ${id}`)
        }
    )
}

//function to delete a county
const deleteCounty = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM counties WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`County deleted with ID: ${id}`)
    })
}

//function to get all the countries
const getCountries = (request, response) => {
    dbconfig.pool.query('SELECT * FROM countries ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single country by ID
const getCountryById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM countries WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new country
const createCountry = (request, response) => {
    const { code, name, continent_name, active } = request.body
  
    dbconfig.pool.query('INSERT INTO countries (code, name, continent_name, active ) VALUES ($1, $2, $3, $4)', [code, name, continent_name, active ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Country added with ID: ${results.insertId}`)
    })
  }

//function to update an existing country
const updateCountry = (request, response) => {
    const id = parseInt(request.params.id)
    const {code, name, continent_name, active } = request.body

    dbconfig.pool.query(
        'UPDATE countries SET code = $1, name = $2, continent_name = $3, active = $4 WHERE id = $5',
        [code, name, continent_name, active, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Country modified with ID: ${id}`)
        }
    )
}

//function to delete a country
const deleteCountry = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM countries WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`Country deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,

    getCounties,
    getCountyById,
    createCounty,
    updateCounty,
    deleteCounty,

    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry,
}