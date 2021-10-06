const mongoose = require('mongoose');

//---- plugin qui ajoute une validation de pré-enregistrement pour les champs uniques ----//
const uniqueValidator = require('mongoose-unique-validator');

//---- Déclaration de notre schéma pour l'utilisateur ----//
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Enter an email address.'],
        unique: [true, 'That email address is taken.']
    },
    password: {
        type: String,
        required: [true, 'Enter a password.']
    }
});

//---- Application du plugin à notre userSchema définit ----//
userSchema.plugin(uniqueValidator);

//---- Exportation du modèle User pour l'utiliser sur d'autres fichiers ----//
module.exports = mongoose.model('User', userSchema);