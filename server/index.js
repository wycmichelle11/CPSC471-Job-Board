import express from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import resumeRoutes from "./routes/resumes.js"
import appliedRoutes from "./routes/appliedto.js"
import cookieParser from "cookie-parser"


const app = express()

app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/appliedto", appliedRoutes);

app.listen(3001,() => {
    console.log("running on port 3001");
})