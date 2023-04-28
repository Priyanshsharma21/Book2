const Book = require("../models/userModel")

const createBook = async function (req, res) {
    try {
        let data = req.body
        const book = await Book.create(data)
        res.status(200).json({
            success: true,
            book: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}


const getBooksInYear = async function (req, res) {
    try {
        let {
            year
        } = req.body

        const book = await Book.find({
            year: year
        })
        res.status(200).json({
            success: true,
            book: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

const getParticularBooks = async function (req, res) {
    try {

        let {
            bookName,
            authorName,
            category,
            year,
            tags,
            totalPages
        } = req.query

        let condition = {};

        if (bookName) {
            condition.bookName = bookName;
        }

        if (authorName) {
            condition.authorName = authorName;
        }

        if (category) {
            condition.category = category;
        }

        if (year) {
            condition.year = year;
        }

        if (tags) {
            condition.tags = {
                $all: tags.split(",")
            };
        }

        if (totalPages) {
            condition.totalPages = totalPages;
        }



        const book = await Book.find(condition)
        res.status(200).json({
            success: true,
            book: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}


const getXINRBooks = async function (req, res) {
    try {
        let books = await Book.find({
            "price.indian": { $in: [199, 299, 399] }
          })


        //!   Or

        // const filteredBooks = books.filter((book,i)=>{
        //     return book.price.indian===199 || book.price.indian===299 || book.price.indian===499 
        // })


        res.status(200).json({
            success: true,
            getXINRBooks: books
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}


const getRandomBooks = async function (req, res) {
    try {
        let books = await Book.find({$or : [
            { stockAvailable: true },
            { totalPages: { $gt: 500 } }
        ]})

        res.status(200).json({
            success: true,
            getRandomBooks: books
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}



const getAllBooks = async function (req, res) {
    try {
        let books = await Book.find()
        res.status(200).json({
            success: true,
            books: books
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

const getBookLists = async function (req, res) {
    try {
        let books = await Book.find().select({
            bookName: 1,
            authorName: 1,
            _id: 0
        })
        res.status(200).json({
            success: true,
            bookList: books
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}




const updateABook = async function (req, res) {
    try {
        const {
            bid
        } = req.params
        let updatedBook = req.body
        const book = await Book.findByIdAndUpdate(bid, updatedBook, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        console.log(book)

        res.status(200).json({
            success: true,
            updatedBook: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}


const deleteABook = async function (req, res) {
    try {
        const {
            bid
        } = req.params
        const deletedBook = await Book.findByIdAndDelete(bid)

        res.status(200).json({
            success: true,
            deletedBook: deletedBook
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}




module.exports.createBook = createBook
module.exports.getAllBooks = getAllBooks
module.exports.getBookLists = getBookLists
module.exports.updateABook = updateABook
module.exports.deleteABook = deleteABook
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks

