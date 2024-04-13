const Auth = require("../models/auth.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const register = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const user = await Auth.findOne({email})
    if (user) {
        return res.status(400).json("Bu eposta kullanılmış.")
    }
    if (password.length < 6) {
        return res.status(400).json("Parola 6 karakterden küçük.")
    } 

    const passwordHash = await bcrypt.hash(password, 12)

    const NewUser = await Auth.create({username, email, password: passwordHash})

    const userToken = jwt.sign({id: NewUser.id}, process.env.JWT_CODE)
    res.status(201).json({status: "OK", NewUser, userToken})

    } catch (error) {
        return res.status(400).json("Kullanıcı oluşturulamadı.")
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await Auth.findOne({email})
        if (!user) {
            return res.status(400).json("Böyle bir kullanıcı bulunamadı.")
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json("Parola yanlış.")
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_CODE)

        res.status(201).json({status: "OK", user, token})

    } catch (error) {
        return res.status(400).json("Giriş yapılmadı.")
    }
}

module.exports = {register, login}