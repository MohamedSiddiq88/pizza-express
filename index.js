import express from "express";
import dotenv from "dotenv"
import { mentorsRouter } from "./Routers/mentors.js";
import { studentsRouter } from "./Routers/students.js";
import { welcomeRouter } from "./Routers/welcome.js";
import { usersRouter } from "./Routers/users.js";
import { isAuthenticated } from "./Authentication/auth.js";
import cors from "cors";
import { menuRouter } from "./Routers/menu.js";



// configure the envirenment
dotenv.config()

//initialize express server framework
const PORT=process.env.PORT;
const app=express();

//middleware
app.use(cors());
app.use(express.json());

//students routers
app.use("/mentors",isAuthenticated,mentorsRouter);
app.use("/students",studentsRouter);
app.use("/",welcomeRouter);
app.use("/menu",menuRouter);
app.use("/users",usersRouter)
console.log("");

//listen to a server
app.listen(PORT,()=>console.log( `server started in localhost:9090`));