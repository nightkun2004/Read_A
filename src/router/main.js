const express = require("express")
const router = express.Router()

const { getHome, getWelcome } = require("../controller/indexController")

router.get("/", getWelcome)
router.get("/read/:urlslug", getHome)

module.exports = router