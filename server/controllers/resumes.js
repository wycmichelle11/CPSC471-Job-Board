import {db} from "../db.js"

export const getResume = (req, res) => {
    const q = "SELECT * FROM  resume";
    db.query(q, (err,data) => {
        if(err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
};

export const addResume = (req, res) => {
    // const token = req.cookies.access_token;
    // if(!token) return res.status(401).json("Not authenticated!");

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //    if (err) return res.status(403).json("Token is not valid");
    const q = "INSERT INTO resume(`job_seeker_email`, `contact_information`, `education`, `first_name`, `last_name`, `interests`, `additional_information`, `work_experience`) VALUES (?)";  
        const values = [
            req.body.job_seeker_email,
            req.body.contact_information,
            req.body.education,
            req.body.first_name,
            req.body.last_name,
            req.body.interests,
            req.body.additional_information,
            req.body.work_experience,
        ];

        db.query(q, [values], (err, data)=> {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created");
        })

        
    //  }
    //  )

    
}