import {db} from "../db.js"
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = "SELECT * FROM  job_posting";
    db.query(q, (err,data) => {
        if(err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
};
export const getPost = (req, res) => {
    const q =
    "SELECT `email`, `first_name`, `last_name`, `other_contact_info`, `about`, `affiliated_company` FROM users u JOIN job_posting p ON u.account_id = p.job_id WHERE p.job_id = ? "
    db.query(q, [req.params.jobid], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
       if (err) return res.status(403).json("Token is not valid");
        const q = "INSERT INTO job(`company_name`) VALUES (?)"
         const q1 = "INSERT INTO job_posting(`title`, `location`, `flag`, `qualification`, `link`, `disclaimer`, `compensation`, `application_deadline`, `account_id`) VALUES (?)";
        // const q2 = "UPDATE users, account SET users.account_id = account.account_id WHERE users.email = account.email"


        const values = [
            req.body.title,
            req.body.location,
            req.body.flag,
            req.body.qualification,
            req.body.link,
            req.body.disclaimer,
            req.body.compensation,
            req.body.application_deadline,
            userInfo.account_id

        ];

        db.query(q, [req.body.company_name], (err, data)=> {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created");
        })

        db.query(q1, [values], (err, data)=> {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created");
        })
     })

    
}
export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const jobId = req.params.jobid;

        const q = "DELETE FROM job_posting WHERE `job_id` = ? AND `account_id` = ?";

        db.query(q, [jobId,userInfo.account_id], (err,data)=>{
            if(err) return res.status(403).json("You can delete only your post!")

            return res.json("Post has been deleted!")
        })
        
    });
};
export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
    })

    const jobId = req.params.jobid;
    const q = "UPDATE job_postings SET `title`=?, `location`=?, `flag`=?, `qualification`=?, `link`=?, `disclaimer`=?, `compensation`=?, `application_deadline`=? WHERE `job_id` = ? AND account_id = ?";

    const values = [
        req.body.title,
        req.body.location,
        req.body.flag,
        req.body.qualification,
        req.body.link,
        req.body.disclaimer,
        req.body.compensation,

    ];

    db.query(q, [...values,jobId, userInfo.account_id], (err, data)=> {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated");
    })
}