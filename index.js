const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./config/database.js")
const dotenv = require("dotenv")
const authRouter = require("./routes/auth.js")
const ProductRouter = require("./routes/product.js")

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(cors())

db()

app.use("/auth", authRouter)
app.use("/product", ProductRouter)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(process.env.port || 3000, () => {
    console.log("server is running")
})