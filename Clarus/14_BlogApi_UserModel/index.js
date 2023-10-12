const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT 

app.use(express.json())

//*----------------------------------------------*/


// db conncection
require('./src/dbConnection')

// routers
app.use('/blog',require('./src/routes/blogRoute'))






//*----------------------------------------------*/

// error handler
app.use(require('./src/errorHandler'))

app.listen(PORT, console.log('-- Server is running --'))