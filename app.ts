import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connection } from './db/dbConnection'
import userRouter from './routes';

dotenv.config();

const app: Express = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT! || 3000;

app.use(bodyParser.json());

app.use(userRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Home page." });
});

async function startServer(): Promise<void> {
    try {
        await connection;
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
}

startServer();
