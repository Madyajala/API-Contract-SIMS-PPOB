const express = require ('express')
const router = require('./routers/index');
// const errorHandler = require('./middleware/errorHandling');
const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(router);

// app.use(errorHandler)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})