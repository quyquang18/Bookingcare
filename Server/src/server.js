require('dotenv').config();
import cors from 'cors';
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import checkAuth from "./middleware/checkAuth";
let app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// app.use(checkAuth.checkAuth);
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})