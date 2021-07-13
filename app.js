// для запуска через терминал: npm start
var infodnamedb; // получение списка наименований из бд
var SQLstatus = `Online`; // нет подключение к БД
var tableobject;
var allblocks = [
    "test 1"
];
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var appp = express();
//appp.set('views', './resources/views'); //отключить во время разработки

appp.use( bodyParser.urlencoded( { extended: true} ) );
appp.use ( bodyParser.json() );

appp.get( "/", function (req, res ) {
    res.render('index.ejs', {SQLstatus: SQLstatus, allblocks: JSON.stringify(allblocks)});
    SQLstatus = `Online`;
    loadingsqlname();
});

appp.get( "/infobdstatus", function (req, res ) {
    let tabletest = JSON.stringify(tableobject);
    res.render('table.ejs', {tableobject: tabletest});
    //console.log(tabletest);
});

appp.get( "/style.css", function (req, res ) {
    //res.sendFile('style.css', { root: path.join(__dirname, '../views') });  //отключить во время разработки
    res.sendFile(__dirname + '/views/style.css'); //отключить когда всё готово
});

appp.get( "/script.js", function (req, res ) {
    //res.sendFile('script.js', { root: path.join(__dirname, '../views') });  //отключить во время разработки
    res.sendFile(__dirname + '/views/script.js'); //отключить когда всё готово
});

appp.get( "/scripttwo.js", function (req, res ) {
    //res.sendFile('scripttwo.js', { root: path.join(__dirname, '../views') });  //отключить во время разработки
    res.sendFile(__dirname + '/views/scripttwo.js'); //отключить когда всё готово
});

appp.listen(3000, function (){
    console.log("server started on port: 3000"); // сервер запущен успешно
});

const {app, BrowserWindow} = require('electron');
const ejse = require('ejs-electron');
const { Script } = require('vm');
 
let mainWindow;
 
ejse.data('username', 'Some Guy');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 1024,
    });
    mainWindow.loadURL('http://localhost:3000/');
    mysqlconnect();
    mainWindow.webContents.openDevTools(); // окно разработки отключить когда всё готово
});

const mysql = require('mysql'); // подключаем библиотеку к скрипту
const { response } = require('express');
const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : '',
    password : '',
    database : ''
});

function mysqlconnect() {
    pool.getConnection(function(err, connection) { // подключаемся
        if (err) { // в случае ошибки в err будет объект ошибки
            console.error('[MySQL] Connection error: ' + err.stack);
            SQLstatus = `Offline`;
            return;
        }
        else {
            console.log('[MySQL] load confirm'); // БД загружена успешно!
            loadingsqlname();
            SQLstatus = `Online`;
        }
       connection.release();
    });
}
// получение списка наименований из бд
function loadingsqlname() {
    pool.query('SELECT * FROM statistikwork', function (err, results){
        infodnamedb = Object.values(JSON.parse(JSON.stringify(results)));
        for (key in infodnamedb) {
            let statusname = allblocks.indexOf(infodnamedb[key].name)
            if(statusname < 0) {
                allblocks.push(infodnamedb[key].name);
            }
        }
        console.log(allblocks);
    });
};
//
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

appp.post( "/back", function (req, res ) {
    res.redirect('/');
});

appp.post('/savebd', function (req, res) {
    let gname = req.body.gname;
    let gyear =  req.body.gyear;
    let gnumber = req.body.gnumber;
    let goperation = req.body.goperation;
    let gdoperation = req.body.gdoperation;
    let gexecutor = req.body.gexecutor;
    let date = req.body.date;
    let time = req.body.realtime;

    if(gname != `` && gnumber != `` && goperation != `` && gexecutor != `` && date != ``)
    {
    //console.log({gname, gyear, gnumber, goperation, gdoperation, gexecutor, date});
        pool.query('INSERT INTO statistikwork SET name = ?, year = ?, number = ?, operation = ?, information = ?, executor = ?, date = ?, status = ?, finalinformation = ?, finalexecutor = ?, conclusion = ?, 	timeone = ?', [gname, gyear, gnumber, goperation, gdoperation, gexecutor, date, ``, ``, ``, ``, time], function (err, results){
            if(err) {
                SQLstatus = `Offline`;
                res.redirect('/');
                mysqlconnect();
            }
            else {
                SQLstatus = `Confirm`;
                res.redirect('/');
                loadingsql();
                console.log(`Save confirm in DB!`)
            }
        });
    }
    else {
        gname = ``;
        gyear = ``;
        gnumber = ``;
        goperation = ``;
        gdoperation = ``;
        gexecutor = ``;
        date = ``;
        SQLstatus = `Failed`;
        res.redirect('/');
        loadingsql();
        console.log(`There is not enough data to send to the database`); // не все обязательные поля заполнены
    }

})

appp.post('/requestbd', function (req, res) {
    let namesearth = req.body.namesearth;
    let numbersearth =  req.body.numbersearth;
    if(namesearth && numbersearth) {
        pool.query('SELECT * FROM statistikwork WHERE name = ? AND number = ?', [namesearth, numbersearth], function (err, results) {
            if (err) {console.log(err);}
            tableobject = Object.values(JSON.parse(JSON.stringify(results)));
            //console.log(results);
        });
        res.redirect('/infobdstatus');
        return;
    }
        else if(namesearth){
            pool.query('SELECT * FROM statistikwork WHERE name = ?', [namesearth], function (err, results) {
                if (err) {console.log(err);}
                tableobject = Object.values(JSON.parse(JSON.stringify(results)));
                //console.log(results);
            });
            res.redirect('/infobdstatus');
            return;
        }  
            else if(numbersearth){
                pool.query('SELECT * FROM statistikwork WHERE number = ?', [numbersearth], function (err, results) {
                    if (err) {console.log(err);}
                    tableobject = Object.values(JSON.parse(JSON.stringify(results)));
                });
                res.redirect('/infobdstatus');
                return;
            }
})