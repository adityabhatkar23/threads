const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const connectToDb = require("./db/db")
connectToDb()
const cookieParser = require("cookie-parser")
const cors = require("cors")

const userRoutes = require("./routes/user.routes")
const threadRoutes = require("./routes/thread.routes")

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
	res.send("hello world kaise ho")
});

app.use("/",userRoutes)
app.use("/threads", threadRoutes)

module.exports = app;