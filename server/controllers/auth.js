import { db } from "../db.js"

export const register = (req, res)=> {
//check existing user
const q = "SELECT * FROM users WHERE email = ?"
db.query (q,[req.body.email], (err, data) => {
    if (err) return res.json(err);
    if(data.length) return res.status(409).json("User already exsists");
    
    //ENCRYPT PASSWORD IF YOU HAVE TIME


    const q = "insert into users(`email`, `password`, `first_name`, `last_name`) VALUES (?)"
    const values = [
        req.body.email,
        req.body.password,
        req.body.first_name,
        req.body.last_name,
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User has been creaded!!!!");
    })

    }); 
};
export const login = (req, res)=> {
    
};
export const logout = (req, res)=> {
    
};