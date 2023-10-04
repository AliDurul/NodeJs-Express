

/* ------------------------------------------------------- */
// Accept json data & convert to object:

// app.all('/', (req, res) => {
//     res.send('WELCOME TO TODO API')
// })

/* ------------------------------------------------------- */
//* TodoModel moved to todo.model.js

app.use(require('./todo.router'))

/* ------------------------------------------------------- */


app.use(errorHandler)
/* ------------------------------------------------------- */