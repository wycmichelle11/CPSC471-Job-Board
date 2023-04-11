import {db} from "../db.js"



export const addAppliedTo = (req, res) => {
    // const token = req.cookies.access_token;
    // if(!token) return res.status(401).json("Not authenticated!");

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //    if (err) return res.status(403).json("Token is not valid");
         const q = "INSERT INTO applied_to(`company_name`, `job_seeker_email`, `job_post_id`) VALUES ((SELECT company_name FROM job WHERE job_id = ?),(SELECT u.email FROM users u JOIN job_posting p ON u.account_id = p.account_id WHERE p.job_id = ?), ?)";  
            db.query(q, [req.params.jobid, req.params.jobid, req.params.jobid], (err, data)=> {
                if (err) return res.status(500).json(err);
                return res.json("Post has been created");
        })
    //  }) 
}

export const getAppliedTo = (req, res) => {
    const q = "SELECT * FROM job_posting p JOIN applied_to a ON p.job_id = a.job_post_id";
    db.query(q, (err,data) => {
        if(err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
};