const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2119',
    database: 'jobboard',
    
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//used only for inserting items
app.post('/api/insert', (req, res) => {
    const title = req.body.title
    const location = req.body.location
    
    const sqlInsert ="INSERT INTO job_posting (title, location) VALUES (?,?);"
    db.query(sqlInsert, [title, location], (err, result)=> {
        console.log(result);
    })
});

app.get('/', (req, res) => {
    
});

app.listen(3001,() => {
    console.log("running on port 3001");
})