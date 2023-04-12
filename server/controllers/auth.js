import { db } from "../db.js"
import jwt from "jsonwebtoken";
import crypto from "crypto";

const salt = "Umju9wE7LQeYLIyZpFzQuZBI00IgmLXH";
export const register = (req, res)=> {
//check existing user
const q = "SELECT * FROM users WHERE email = ?"
db.query (q,[req.body.email], (err, data) => {
    if (err) return res.json(err);
    if(data.length) return res.status(409).json("This email is already registered! Please login or enter a new email!");

    const q1 = "INSERT IGNORE INTO company(`name`) VALUES (?)"
    const q2 = "INSERT INTO users(`email`, `password`, `first_name`, `last_name`, `affiliated_company`) VALUES (?)"
    const salted = req.body.password + salt;
    const hashed = crypto.createHash('sha256').update(salted).digest('hex');
    const values = [
        req.body.email,
        hashed,
        req.body.first_name,
        req.body.last_name,
        req.body.affiliated_company
    ]
    db.query(q1, [req.affiliated_company], (err, data) => {
        if (err) return res.json(err);
            if (err) return res.json(err);
            db.query(q2, [values], (err, data) => {
                if (err) return res.json(err);
                    return res.status(200).json("User has been created!!!!");
            })
        if(req.body.affiliated_company != null){db.query(q1, [req.body.affiliated_company], (err,data) => {if (err) return res.json(err); })}

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
    const salted = req.body.password + salt;
    const hashed = crypto.createHash('sha256').update(salted).digest('hex');
    if (data[0].password != hashed) return(res.status(400).json("Incorrect username or password"));


    const token = jwt.sign({account_id:data[0].account_id, verification:data[0].verified, company:data[0].affiliated_company}, "jwtkey") //check id
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

export const verify = (req, res) => {
    const email = req.params.account;
    const q = "UPDATE IGNORE `jobboard`.`users` SET `verified` = '1' WHERE `email` = ?"
    db.query(q,email, (err, data) => {
        if (err) return res.json(err);
        const token = req.cookies.access_token;
        const decoded = jwt.decode(token);
        decoded.verification = 1;
        const newToken = jwt.sign(decoded, "jwtkey")
        res.cookie("access_token", newToken, {
            httpOnly: true
        }).status(200)
        return res.status(200).json("User has been verified.");
    })
}