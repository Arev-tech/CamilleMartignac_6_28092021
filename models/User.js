const mongoose = require('mongoose');

//---- plugin qui ajoute une validation de pré-enregistrement pour les champs uniques ----//
const uniqueValidator = require('mongoose-unique-validator');

//---- Déclaration de notre schéma pour l'utilisateur ----//
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//---- Application du plugin à notre userSchema définit ----//
userSchema.plugin(uniqueValidator);

//---- Exportation du modèle User pour l'utiliser sur d'autres fichiers ----//
module.exports = mongoose.model('User', userSchema);