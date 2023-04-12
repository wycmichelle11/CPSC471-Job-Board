import {db} from "../db.js"
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = "SELECT * FROM  job_posting";
    db.query(q, (err,data) => {
        if(err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
};
/*export const getPost = (req, res) => {
    const q =
    "SELECT `email`, `first_name`, `last_name`, `other_contact_info`, `about`, `affiliated_company` FROM users u JOIN job_posting p ON u.account_id = p.job_id WHERE p.job_id = ? "
    db.query(q, [req.params.jobid], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};*/
export const getPost = (req, res) => {
    const jobId = req.params.jobid;
    const q = "SELECT * FROM  job_posting p WHERE p.job_id = ? ";
    db.query(q, [jobId], (err,data) => {
        if(err) return res.status(500).send(err);
        return res.status(200).json(data[0]);
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = "INSERT INTO job_posting(`title`, `location`, `description`, `qualification`, `link`, `disclaimer`, `compensation`, `application_deadline`, `account_id`) VALUES (?)";
        const q1 = "INSERT INTO job VALUES ((SELECT MAX(`job_id`) FROM job_posting), ?)"
        const q2 = "INSERT INTO available_jobs VALUES ((SELECT MAX(`job_id`) FROM job_posting), (SELECT u.email FROM users u JOIN job_posting p ON u.account_id = p.account_id WHERE p.job_id = (SELECT MAX(`job_id`) FROM job_posting)))" 

        const values = [
            req.body.title,
            req.body.location,
            req.body.description,
            req.body.qualification,
            req.body.link,
            req.body.disclaimer,
            req.body.compensation,
            req.body.application_deadline,
            userInfo.account_id

        ];

        db.query(q, [values], (err, data)=> {
            if (err) return res.status(500).json(err);
            db.query(q1, [req.body.company_name], (err, data)=> {
                if (err) return res.status(500).json(err);
                db.query(q2, [userInfo.account_id], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.json("Post has been created");
                })
                
            })
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
        const q1 = "DELETE FROM job WHERE `job_id` = ?"
        const q2 = "DELETE FROM available_jobs WHERE `available_job` = ?"
        console.log(userInfo.account_id);
        db.query(q2, [jobId], (err,data)=>{
            if(err) return res.status(403).json("You can delete only your post!1");
            db.query(q1, [jobId], (err, data) => {
                if(err) return res.status(403).json("You can delete only your post!2");
                db.query(q, [jobId,userInfo.account_id], (err,data)=>{
                    if(err) return res.status(403).json("You can delete only your post!3");
                    return res.json("Post has been deleted!");
                })
            })
            
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
    const q = "UPDATE job_posting SET `title`=?, `location`=?, `description`=?, `qualification`=?, `link`=?, `disclaimer`=?, `compensation`=?, `application_deadline`=? WHERE `job_id` = ?";

    const values = [
        req.body.title,
        req.body.location,
        req.body.description,
        req.body.qualification,
        req.body.link,
        req.body.disclaimer,
        req.body.compensation,
        req.body.application_deadline
    ];

    db.query(q, [...values,jobId], (err, data)=> {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated");
    })
};

