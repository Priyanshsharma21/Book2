const mongoose = require('mongoose');

const {Schema, model} = mongoose

const bookSchema = new Schema( {
    bookName: {
        type : String,
        required : true,
        unique : true,
    },
    authorName: {
        type : String,
    },
    price : {
        indian : {
            type : Number,
            required : true,
        },
        euporean : {
            type : Number,
            required : true,
        },
    },

    tags : {
        type : [String],
    },

    category: {
        type : String,
        enum: ["self-help", "fiction", "sifi", "horror & mystery", "non-fiction", "fantasy", "children", "Romance"]
    },
    year : {
        type : Number,
        default : 2021
    },

    Stock : {
        type : Boolean,
    },

    totalPages : {
        type : Number
    }

    
}, { timestamps: true });

module.exports = model('Book', bookSchema) //users


