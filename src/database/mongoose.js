const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/todo-list-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
