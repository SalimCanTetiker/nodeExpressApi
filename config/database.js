const mongoose = require("mongoose")

const db = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongodb connect")
    })
    .catch((error) => {
        console.log(error)
    })
}

module.exports = db