const express = require('express')
const multer = require('multer')
const short = require('short-uuid');
const fs = require('fs')
var request = require('request');
var bodyParser = require("body-parser");

var folderName = "uploads";
const translator = short()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, folderName)
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${translator.new()}-${originalname}`);
    }
})
const upload = multer({ storage: storage })
const app = express()

// app.use(express.static('client'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const RESTAPIURL = "http://127.0.0.1:8001/files"

app.get("/", function (req, res) {
    request(RESTAPIURL, function (error, response, body) {
        console.log(JSON.parse(body))

        res.render("index", { task: JSON.parse(body) });
    })
});

app.post('/upload', upload.array("fileObj"), (req, res) => {
    return res.json({ status: "Ok", uploaded: req.files.length });

})


app.post('/removetask', function (req, res) {
    console.log(req.body)

})


app.listen(3001, () => console.log("App is listening on 3001 ..."))
