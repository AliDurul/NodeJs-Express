const express = require('express')

const app = express()

app.get('/', (req,res) => {
  res.status(200).send('home page')
})

app.get('/about', (req,res) => {
  res.status(200).send("this is about page")
})

app.all('*', (req,res) => {
    res.status(404).send("Resource not found")
  })


app.listen(5000, () => {
  console.log('server is listening on port 5000');
})