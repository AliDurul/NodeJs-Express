const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT 

app.use(express.json())

//*----------------------------------------------*/

// session cookies
const session = require('cookie-session')
app.use(session({secret : process.env.SECRET_KEY, })) //?  maxAge: 1000 * 60* 60 * 24,


// db conncection
require('./src/dbConnection')
// searchSortPagination
app.use(require('./src/middlewares/findSearchSortPage'))

// routers
app.use('/user', require('./src/routes/userRoute'))
app.use('/blog',require('./src/routes/blogRoute'))






//*----------------------------------------------*/

//* Sync
// require('./src/sync')()


// error handler
app.use(require('./src/errorHandler'))

app.listen(PORT, console.log('-- Server is running --'))