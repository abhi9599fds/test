import express from "express";
import cors from "cors";
import compression from "compression";
import { router } from "./controller.js"
import { sequelize } from "./dBConnection.js"


const app = express();

app.use(compression())
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));

sequelize.sync({
    alter :true,
}).then(() => { 
    console.log("DatabaseCreated"); 
});

app.use(cors());

app.get("/",(req,res) =>{
    res.status(200).json({
        "msg" : "started"
    });
});

app.use("/api" ,router);

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});




