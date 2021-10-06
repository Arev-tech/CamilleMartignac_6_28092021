const mongoose = require('mongoose');

//---- Déclaration de notre schéma pour les sauces ----//
const sauceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Enter a name.'],
    },
    manufacturer: {
        type: String,
        required: [true, 'Enter a manufacter.'],
    },
    description: {
        type: String,
        required: [true, 'Enter a description.'],
    },
    mainPepper: {
        type: String,
        required: [true, 'Enter a mainPepper.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Load a picture'],
    },
    heat: {
        type: Number,
        required: [true, 'Enter a heat.'],
    },
    likes: {
        type: Number,
        default : 0
    },
    dislikes: {
        type: Number,
        default : 0
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