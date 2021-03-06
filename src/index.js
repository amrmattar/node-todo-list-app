const express = require('express')
const cors = require('cors')  
require('./database/mongoose')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port);
})