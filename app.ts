import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connection } from './db/dbConnection'
import { userRouter, postRouter } from './routes';
import http from 'http';
import { Server, Socket } from 'socket.io';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT! || 3000;

app.use(bodyParser.json());
app.use(userRouter);
app.use(postRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Home page." });
});

io.on("connection", (socket: Socket) => {
    console.log("Client connected : ", socket.id);

    socket.on("follow", (data) => {

    })

    socket.on("disconnect", () => {
        console.log("Client disconnected : ", socket.id);
    })
});

async function startServer(): Promise<void> {
    try {
        await connection;
        server.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
}

startServer();
