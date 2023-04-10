import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const register = (req, res)=> {
//check existing user
const q = "SELECT * FROM users WHERE email = ?"
db.query (q,[req.body.email], (err, data) => {
    if (err) return res.json(err);
    if(data.length) return res.status(409).json("This email is already registered! Please login or enter a new email!");
    
    //ENCRYPT PASSWORD IF YOU HAVE TIME

    const q = "INSERT INTO account(`email`) VALUES (?)"
    const q1 = "INSERT INTO company(`name`) VALUES (?)"
    const q2 = "INSERT INTO users(`email`, `password`, `first_name`, `last_name`, `affiliated_company`) VALUES (?)"
    const q3 = "UPDATE users, account SET users.account_id = account.account_id WHERE users.email = account.email"
    const values = [
        req.body.email,
        req.body.password,
        req.body.first_name,
        req.body.last_name,
        req.body.affiliated_company
    ]
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        db.query(q1, [req.body.affiliated_company], (err,data) => {
            if (err) return res.json(err);
            db.query(q2, [values], (err, data) => {
                if (err) return res.json(err);
                db.query(q3, (err, data) => {
                    if (err) return res.json(err);
                    return res.status(200).json("User has been created!!!!");
                })
            })
        })
        
        
    })
    

    }); 
};
export const login = (req, res)=> {
//check existing user    
const q = "SELECT * FROM users WHERE email = ?"
db.query (q,[req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.status(404).json("User not found!");
    
    //check password
    if (data[0].password != req.body.password) return(res.status(400).json("Incorrect username or password"));


    const token = jwt.sign({account_id:data[0].account_id}, "jwtkey") //check id
    const {password, ...other} = data[0];
    res.cookie("access_token", token, {
        httpOnly: true
    }).status(200).json(other)
})


};
export const logout = (req, res)=> {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
};