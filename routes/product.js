const express = require("express")
const {getAllProduct, getProductById, postProduct, putProduct, deleteProduct} = require("../controllers/product")

const router = express.Router()

router.get("/", getAllProduct)
router.get("/:id", getProductById)
router.post("/", postProduct)
router.put("/:id", putProduct)
router.delete("/:id", deleteProduct)

module.exports = router