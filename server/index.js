import express from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"

// const bodyParser = require("body-parser")
const app = express()
// const mysql = require('mysql2')
// const cors = require('cors')



// app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
// app.use(bodyParser.urlencoded({extended: true}));

//getting all jobpostings
// app.get("/api/get", (req, res)=> {
//     const sqlSelect="SELECT * FROM job_posting;"
//     db.query(sqlSelect, (err, result)=> {
//         res.send(result); //send to our front end
//     })
// })




//used only for inserting items
// app.post('/api/insert', (req, res) => {
//     const title = req.body.title
//     const location = req.body.location
    
//     const sqlInsert ="INSERT INTO job_posting (title, location) VALUES (?,?);"
//     db.query(sqlInsert, [title, location], (err, result)=> {
//         console.log(result);
//     })
// });

// app.get('/', (req, res) => {
    
// });

app.listen(3001,() => {
    console.log("running on port 3001");
})