const dbconfig = require('./dbconfig')

let retries = 5;

//function to get all the users
const getUsers = async (request, response) => {
    while (retries) {
        try {
            dbconfig.pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json(results.rows);
            })
            break;
        } catch (error) {
            console.log(error);
            retries -=1;
            console.log(`retries left: ${retires}`);
            //wait 5 seconds
            await new Promise(res => setTimeout(res, 5000));
        }
    }


  
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

//function to get all the countries
const getGenders = (request, response) => {
    dbconfig.pool.query('SELECT * FROM gender ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single country by ID
const getGenderById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM gender WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new gender
const createGender = (request, response) => {
    const { gender, active } = request.body
  
    dbconfig.pool.query('INSERT INTO gender (gender, active ) VALUES ($1, $2)', [gender, active ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Gender added with ID: ${results.insertId}`)
    })
  }

//function to update an existing gender
const updateGender = (request, response) => {
    const id = parseInt(request.params.id)
    const {gender, active } = request.body

    dbconfig.pool.query(
        'UPDATE gender SET gender = $1, active = $2 WHERE id = $3',
        [gender, active, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Gender modified with ID: ${id}`)
        }
    )
}

//function to delete a gender
const deleteGender = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM gender WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`Gender deleted with ID: ${id}`)
    })
}


//function to get all the grades
const getGrades = (request, response) => {
    dbconfig.pool.query('SELECT * FROM grade ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single grade by ID
const getGradeById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM grade WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new grade
const createGrade = (request, response) => {
    const { user_grading_id, user_graded_id, grade } = request.body
  
    dbconfig.pool.query('INSERT INTO grade (user_grading_id, user_graded_id, grade ) VALUES ($1, $2, $3)', [ user_grading_id, user_graded_id, grade ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Grade added with ID: ${results.insertId}`)
    })
  }

//function to update an existing grade
const updateGrade = (request, response) => {
    const id = parseInt(request.params.id)
    const {user_grading_id, user_graded_id, grade } = request.body

    dbconfig.pool.query(
        'UPDATE grade SET user_grading_id = $1, user_graded_id = $2, grade = $3 WHERE id = $4',
        [user_grading_id, user_graded_id, grade, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Grade modified with ID: ${id}`)
        }
    )
}

//function to delete a grade
const deleteGrade = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM grade WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`Grade deleted with ID: ${id}`)
    })
}


//function to get hiv_statuses
const getHIVStatus = (request, response) => {
    dbconfig.pool.query('SELECT * FROM hiv_status ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single hiv_status by ID
const getHIVStatusById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM hiv_status WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new hiv_status
const createHIVStatus = (request, response) => {
    const { user_id, hiv_status, latest_vl_result, yellow_card_picture_link } = request.body
  
    dbconfig.pool.query('INSERT INTO hiv_status (user_id, hiv_status, latest_vl_result, yellow_card_picture_link  ) VALUES ($1, $2, $3, $4)', [ user_id, hiv_status, latest_vl_result, yellow_card_picture_link ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`HIVStatus added with ID: ${results.insertId}`)
    })
  }

//function to update an existing hiv_status
const updateHIVStatus = (request, response) => {
    const id = parseInt(request.params.id)
    const {user_id, hiv_status, latest_vl_result, yellow_card_picture_link  } = request.body

    dbconfig.pool.query(
        'UPDATE hiv_status SET user_id = $1, hiv_status = $2, latest_vl_result = $3, yellow_card_picture_link = $4 WHERE id = $5',
        [user_id, hiv_status, latest_vl_result, yellow_card_picture_link, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`HIVStatus modified with ID: ${id}`)
        }
    )
}

//function to delete hiv_status
const deleteHIVStatus = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM hiv_status WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`HIVStatus deleted with ID: ${id}`)
    })
}

//function to get all the interests
const getInterests = (request, response) => {
    dbconfig.pool.query('SELECT * FROM interest ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single interest by ID
const getInterestById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM interest WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new interests
const createInterest = (request, response) => {
    const { interest, active } = request.body
  
    dbconfig.pool.query('INSERT INTO interest (interest, active ) VALUES ($1, $2)', [interest, active ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Interest added with ID: ${results.insertId}`)
    })
  }

//function to update interests
const updateInterest = (request, response) => {
    const id = parseInt(request.params.id)
    const {interest, active } = request.body

    dbconfig.pool.query(
        'UPDATE interest SET interest = $1, active = $2 WHERE id = $3',
        [interest, active, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Interest modified with ID: ${id}`)
        }
    )
}

//function to delete interest
const deleteInterest = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM interest WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`Interest deleted with ID: ${id}`)
    })
}

//function to get all the occupation
const getOccupations = (request, response) => {
    dbconfig.pool.query('SELECT * FROM occupation ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single occupation by ID
const getOccupationById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM occupation WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a new occupation
const createOccupation = (request, response) => {
    const { occupation_name, active } = request.body
  
    dbconfig.pool.query('INSERT INTO occupation (occupation_name, active ) VALUES ($1, $2)', [occupation_name, active ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Occupation added with ID: ${results.insertId}`)
    })
  }

//function to update occupation
const updateOccupation = (request, response) => {
    const id = parseInt(request.params.id)
    const {occupation_name, active } = request.body

    dbconfig.pool.query(
        'UPDATE occupation SET occupation_name = $1, active = $2 WHERE id = $3',
        [interest, active, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Occupation modified with ID: ${id}`)
        }
    )
}

//function to delete occupation
const deleteOccupation = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM occupation WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`Occupation deleted with ID: ${id}`)
    })
}

//function to get all the personalities
const getPersonalities = (request, response) => {
    dbconfig.pool.query('SELECT * FROM personalities ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single personality by ID
const getPersonalityById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM personalities WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post a personalities
const createPersonality = (request, response) => {
    const { personality, active } = request.body
  
    dbconfig.pool.query('INSERT INTO personalities (personality, active ) VALUES ($1, $2)', [personality, active ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Personality added with ID: ${results.insertId}`)
    })
  }

//function to update personalities
const updatePersonality = (request, response) => {
    const id = parseInt(request.params.id)
    const {personality, active } = request.body

    dbconfig.pool.query(
        'UPDATE personalities SET personality = $1, active = $2 WHERE id = $3',
        [personality, active, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Personality modified with ID: ${id}`)
        }
    )
}

//function to delete personalities
const deletePersonality = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM personalities WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`Personality deleted with ID: ${id}`)
    })
}

//function to get all the signs
const getSigns = (request, response) => {
    dbconfig.pool.query('SELECT * FROM signs ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to get a single sign by ID
const getSignById = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('SELECT * FROM signs WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//function to post new sign
const createSign = (request, response) => {
    const { sign, active } = request.body
  
    dbconfig.pool.query('INSERT INTO signs (sign, active ) VALUES ($1, $2)', [sign, active ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Sign added with ID: ${results.insertId}`)
    })
  }

//function to update signs
const updateSign = (request, response) => {
    const id = parseInt(request.params.id)
    const {sign, active } = request.body

    dbconfig.pool.query(
        'UPDATE signs SET sign = $1, active = $2 WHERE id = $3',
        [sign, active, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Sign modified with ID: ${id}`)
        }
    )
}

//function to delete signs
const deleteSign = (request, response) => {
    const id = parseInt(request.params.id)

    dbconfig.pool.query('DELETE FROM signs WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).send(`Sign deleted with ID: ${id}`)
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

    getGenders,
    getGenderById,
    createGender,
    updateGender,
    deleteGender,

    getGrades,
    getGradeById,
    createGrade,
    updateGrade,
    deleteGrade,

    getHIVStatus,
    getHIVStatusById,
    createHIVStatus,
    updateHIVStatus,
    deleteHIVStatus,

    getInterests,
    getInterestById,
    createInterest,
    updateInterest,
    deleteInterest,

    getOccupations,
    getOccupationById,
    createOccupation,
    updateOccupation,
    deleteOccupation,

    getPersonalities,
    getPersonalityById,
    createPersonality,
    updatePersonality,
    deletePersonality,

    getSigns,
    getSignById,
    createSign,
    updateSign,
    deleteSign,
}