const mongoose = require('mongoose');

//---- Déclaration de notre schéma pour les sauces ----//
const sauceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPepper: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    heat: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    usersLiked: {
        type: [String]
    },
    usersDisliked: {
        type: [String]
    },
})


//---------- Exporter pour pouvoir utiliser le schéma dans d'autres fichiers ---------//
module.exports = mongoose.model('Sauce', sauceSchema);