import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Home page." });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});