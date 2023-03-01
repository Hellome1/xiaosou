const express = require('express')
const conn = require('./sql2')
const path = require('path')
const app = express()

// app.use(express.static('public'))

app.get('/', function (req, res) {
//   res.send(path.join(__dirname, './ind.html'))
    res.sendFile(path.join(__dirname, './public/ind.html'))
})

app.get('/web', function(req, res) {
    console.log(req.query)
    conn(req.query, (r) => {
        console.log('r', r)
        res.send(r)
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})