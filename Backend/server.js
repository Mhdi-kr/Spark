const express = require('express')
const bodyParser = require("body-parser");
const cp = require('child_process')
const fs = require('fs')
var cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

const port = 3000

app.post('/', (req, res) => {
    console.log(req.body)
    fs.writeFileSync('user/file.js', req.body.input)
    const child = cp.exec('node user/file.js');
    child.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`)
        res.send({
            result: data
        })
    })
    child.on('exit', function (code, signal) {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`);
    })
    child.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
        res.send({
            result: data
        })
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:3000`)
})