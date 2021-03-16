import express from "express";
import dotenv from "dotenv";

dotenv.config()

const app = express();
app.use(express.json());

app.get("/ping", (req, res) =>
    res.json({ message: "pong" })
);

app.listen(process.env.PORT, () => console.log(`Server is running`));
