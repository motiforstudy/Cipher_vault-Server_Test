import express from "express";
import authRouter from "./routers/auth_router.js";
import messagesRouter from "./routers/messages_router.js";
import usersRouter from "./routers/users_routers.js";

const app = express();
app.use(express.json());

app.use("/api", authRouter);
app.use("/api", messagesRouter);
app.use("/api", usersRouter)

app.listen(3000, ()=>{
    console.log("the server is ready: ");
});