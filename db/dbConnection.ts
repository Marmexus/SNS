import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const uri: string = process.env.DB_CONN_STRING!;

const connection = mongoose
    .connect(uri)
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log(err);
    });

export default connection;