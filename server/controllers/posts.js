import {db} from "../db.js"

export const getPosts = (req, res) => {
    const q = "SELECT * FROM  job_posting";
    db.query(q, (err,data) => {
        if(err) return res.send(err);
        return res.status(200).json(data);
    });
};
export const getPost = (req, res) => {
    res.json("from controller")
}
export const addPost = (req, res) => {
    res.json("from controller")
}
export const deletePost = (req, res) => {
    res.json("from controller")
}
export const updatePost = (req, res) => {
    res.json("from controller")
}