import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connection from './db/dbConnection'

dotenv.config();

const app: Express = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT! || 3000;

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
