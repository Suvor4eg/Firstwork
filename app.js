var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var appp = express();

appp.use( bodyParser.urlencoded( { extended: true} ) );
appp.use ( bodyParser.json() );

appp.get( "/", function (req, res ) {
    res.render('index.ejs');
} );

appp.get( "/style.css", function (req, res ) {
    res.sendFile(__dirname + '/views/style.css');
} );

appp.get( "/script.js", function (req, res ) {
    res.sendFile(__dirname + '/views/script.js');
} );

appp.post('/', function (req, res) {
    let gname = req.body.gname;
    let gyear =  req.body.gyear;
    let gnumber = req.body.gnumber;
    let goperation = req.body.goperation;
    let gdoperation = req.body.gdoperation;
    let gexecutor = req.body.gexecutor;
    let date = req.body.date;

    if(gname != `` && gyear != `` && gnumber != `` && goperation != `` && gexecutor != `` && date != ``)
    {

       //console.log({gname, gyear, gnumber, goperation, gdoperation, gexecutor, date});

        pool.query('INSERT INTO statistikwork SET name = ?, year = ?, number = ?, operation = ?, information = ?, executor = ?, date = ?, status = ?, finalinformation = ?, finalexecutor = ?, conclusion = ?', [gname, gyear, gnumber, goperation, gdoperation, gexecutor, date, ``, ``, ``, ``], function (err, results){
            //console.log(err);
        });

        res.redirect("/");
    }
    else {
        gname = ``;
        gyear = ``;
        gnumber = ``;
        goperation = ``;
        gdoperation = ``;
        gexecutor = ``;
        date = ``;
        console.log(`There is not enough data to send to the database`); // не все обязательные поля заполнены.
        res.render('index.ejs');
    }
})

appp.listen(3000, function (){
    console.log("server started on port: 3000"); // сервер запущен успешно
});

const mysql = require('mysql'); // подключаем библиотеку к скрипту
const { response } = require('express');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'mysql',
    password : 'mysql',
    database : 'vacuumwork'
});

const {app, BrowserWindow} = require('electron');
const ejse = require('ejs-electron');
 
let mainWindow;
 
ejse.data('username', 'Some Guy');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1552,
        height: 950
    })
    mainWindow.loadURL('http://localhost:3000/')
    mysqlconnect();
    mainWindow.webContents.openDevTools(); // окно разработки
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

function mysqlconnect() {
    pool.getConnection(function(err, connection) { // подключаемся
        if (err) { // в случае ошибки в err будет объект ошибки
            console.error('[MySQL] Connection error: ' + err.stack);
            app.quit();
            return;
        }
        else {
            console.log('[MySQL] load confirm'); // БД загружена успешно!
        }
       
    });
}
console.log(path.dirname(`views`));