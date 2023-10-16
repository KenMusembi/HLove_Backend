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
    const { username, email } = request.body
  
    dbconfig.pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }

//function to update an existing user
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {username, email} = request.body

    dbconfig.pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [username, email, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
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

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}