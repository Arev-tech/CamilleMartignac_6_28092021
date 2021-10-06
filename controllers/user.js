const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const TOKEN_STRING = process.env.TOKEN_STRING

//---- configuration du router signup ----//
exports.signup = (req, res, next) => {
    //---- hachage du mdp avec bcrypt avec 10tours de hachage ----//
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //---- création d'un nouvel user sur la base du modèle construit ----//
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //---- Enregistrement du nouvel user dans la base de donnée ----//
            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                //---- gestion de l'erreur ----//
                .catch(error => res.status(400).json({
                    error
                }));
        })
        //---- gestion de l'erreur ----//
        .catch(error => res.status(500).json({
            error
        }));
};

//---- configuration du router login ----//
exports.login = (req, res, next) => {
    //---- recherche d'un user par son email ----//
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            //---- si pas d'user trouvé dans lma base de donnée ----//
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            //---- vérifier le mot de passe haché ----//
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //---- Si le mot de passe ne correspond pas ----//
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        });
                    }
                    //---- Si le mot de passe correspond ----//
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                                userId: user._id
                            },
                            TOKEN_STRING, {
                                expiresIn: '24h'
                            }
                        )
                    });
                })
                //---- gestion de l'erreur ----//
                .catch(error => res.status(500).json({
                    error
                }));
        })
        //---- gestion de l'erreur ----//
        .catch(error => res.status(500).json({
            error
        }));
};