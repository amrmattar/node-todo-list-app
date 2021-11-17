const express = require('express')
const cors = require('cors')  
require('./database/mongoose')
const Task = require('./models/task')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use(taskRouter)

app.listen(port, () => {})