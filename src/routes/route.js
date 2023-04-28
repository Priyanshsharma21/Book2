const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", UserController.createBook)

router.get("/getAllBooks", UserController.getAllBooks)

router.get("/booklist", UserController.getBookLists)


router.get("/getParticularBooks", UserController.getParticularBooks)

router.post("/getBooksInYear", UserController.getBooksInYear)

router.get("/getXINRBooks", UserController.getXINRBooks)

router.get("/getRandomBooks", UserController.getRandomBooks)

 

router.put("/book/:bid", UserController.updateABook)


router.delete("/book/:bid", UserController.deleteABook)



module.exports = router;