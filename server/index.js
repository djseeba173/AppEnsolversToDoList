const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

 const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cruddatabase',
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM cruddatabase.task_todo;"

    db.query(sqlSelect, (err, result) => {
        console.log("hola, esto pasó")
        res.send(result)
    })
})

app.post('/api/insert', (req, res) =>{
    const task = req.body.description;
    
    const sqlInsert = "INSERT INTO task_todo (description) VALUES (?); "

    db.query(sqlInsert, task, (err, result) => {
        
    })
})

app.delete('/api/delete/:description', (req, res) => {
    const name = req.params.description
    const sqlDelete = "DELETE FROM task_todo WHERE description = ?;";

    db.query(sqlDelete, name, (err, result)=> {
        if(err){
            console.log(err)
        }
    })
})

app.put('/api/update', (req, res) => {
    const nuevo = req.body.newDescription;
    const viejo = req.body.oldDescription;
    const sqlUpdate = "UPDATE task_todo SET description = ? WHERE description = ?;";

    db.query(sqlUpdate, [nuevo, viejo], (err, result)=> {
        if(err){
            console.log(err)
        }
    })
})

app.listen(3001, () => {
    console.log("Hello World Port:3001")
})