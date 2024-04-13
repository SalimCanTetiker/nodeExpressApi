const Product = require("../models/product")

const getAllProduct = async (req, res) => {
    try {
        const Products = await Product.find()
        res.json(Products)
    } catch (error) {
        res.json(error)
    }
}
const getProductById = async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id)
        res.json(oneProduct)
    } catch (error) {
        res.json(error)
    }
}
const postProduct = async (req, res) => {
    try {
        const post = await new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        })
        post.save()
        res.json(post)
    } catch (error) {
        res.json(error)
    }
}
const putProduct = async (req, res) => {
    try {
        const update = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        })
        res.json(update)
    } catch (error) {
        res.json(error)
    }
}
const deleteProduct = async (req, res) => {
    try {
        const remove = await Product.findByIdAndDelete(req.params.id)
        res.json(remove)
    } catch (error) {
        res.json(error)
    }
}

module.exports = { getAllProduct, getProductById, postProduct, putProduct, deleteProduct }