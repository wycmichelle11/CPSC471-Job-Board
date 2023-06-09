import {db} from "../db.js"
import jwt from "jsonwebtoken";


export const addAppliedTo = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
       if (err) return res.status(403).json("Token is not valid");
       if(userInfo.verification !== 1) return res.status(403).json(1);
         const q = "INSERT INTO applied_to(`company_name`, `job_seeker_email`, `job_post_id`) VALUES ((SELECT company_name FROM job WHERE job_id = ?),(SELECT email FROM users WHERE account_id = ? ) , ?)";  
            db.query(q, [req.params.jobid, userInfo.account_id, req.params.jobid], (err, data)=> {
                if (err) return res.status(500).json(err);
                return res.json("Post has been created");
        })
     }) 
}

export const getAppliedTo = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
       if (err) return res.status(403).json("Token is not valid");
    
        const q = "SELECT * FROM job_posting p JOIN applied_to a ON p.job_id = a.job_post_id WHERE a.job_seeker_email = (SELECT email FROM users WHERE account_id = ? )";
        db.query(q, [userInfo.account_id], (err,data) => {
            if(err) return res.status(500).send(err);
            return res.status(200).json(data);
        });
    })
};

export const addFlag= (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = "INSERT IGNORE INTO flag(`job_id`, `account_id`) VALUES (?,?)";
        db.query(q, [req.params.jobid, userInfo.account_id], (err, data)=> {
            if (err) return res.status(500).json(err);
            return res.json("Post has been flagged");
        })
    })
}

export const delFlag= (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = "DELETE FROM flag WHERE `job_id` = ? AND `account_id` = ?";
        db.query(q, [req.params.jobid, userInfo.account_id], (err, data)=> {
            if (err) return res.status(500).json(err);
            return res.json("Post has been unflagged");
        })
    })
}

export const getFlagged = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "SELECT * FROM job_posting p JOIN flag f ON p.job_id = f.job_id WHERE f.account_id = ?";
        db.query(q, [userInfo.account_id], (err,data) => {
            if(err) return res.status(500).send(err);
            return res.status(200).json(data);
        });
    })
};