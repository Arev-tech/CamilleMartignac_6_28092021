const Sauce = require('../models/Sauces');
const fs = require('fs');

//----  ----//
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        //---- On renvoie toutes les sauces ----//
        .then(sauces => res.status(200).json(sauces))
        //---- gestion de l'erreur ----//
        .catch(error => res.status(400).json({
            error
        }));
};

//----  ----//
exports.getOneSauce = (req, res, next) => {
    //---- On cherche la sauce grâce à son id ----//
    Sauce.findOne({
            _id: req.params.id
        })
        //---- si on la trouve on la renvoie ----//
        .then(sauce => res.status(200).json(sauce))
        //---- gestion de l'erreur ----//
        .catch(error => res.status(404).json({
            error
        }));
};

//----  ----//
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    //---- création d'une nouvelle sauce à partie du modèle construit ----//
    const sauce = new Sauce({
        ...sauceObject,
        //---- construction du chemin pour l'image ----//
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //---- sauvergarde de la sauce dans la base de donnée ----//
    sauce.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré'
        }))
        //---- gestion de l'erreur ----//
        .catch(error => res.status(400).json({
            error
        }));
};

//----  ----//
exports.modifySauce = (req, res, next) => {
    //---- On récupère les nouvelles données de la sauce ----//
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    //---- Modification de la sauce ----//
    Sauce.updateOne({
            _id: req.params.id
        }, {
            ...sauceObject,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet modifié !'
        }))
        //---- gestion de l'erreur ----//
        .catch(error => res.status(400).json({
            error
        }));
};

//----  ----//
exports.deleteSauce = (req, res, next) => {
    //---- On cherche la sauce grâce à son id ----//
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            //---- Si on trouve une sauce correspondante on récupère l'URL image ----//
            const filename = sauce.imageUrl.split('/images/')[1];
            //---- supprime l'url image ----//
            fs.unlink(`images/${filename}`, () => {
                //---- supprime de la base de données la sauce correspondante a l'ID ----//
                Sauce.deleteOne({
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Objet supprimé !'
                    }))
                    //---- gestion de l'erreur ----//
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })
        //---- gestion de l'erreur ----//
        .catch(error => res.status(500).json({
            error
        }));
};

//----  ----//
exports.likeOrDislike = (req, res, next) => {
    if (req.body.like === 1) { //---- il s'agit d'un like ----//
        //---- Modifie les (dis)likes ---//
        Sauce.updateOne({
                _id: req.params.id
            }, {
                //---- on envoie dans le tableau des likes l'userID ----//
                $push: {
                    usersLiked: req.body.userId
                }
            }, {
                //---- on incrémente les likes ----//
                $inc: {
                    likes: +1
                },
            })
            .then(() => res.status(200).json({
                message: 'like ajouté !'
            }))
            //---- gestion de l'erreur ----//
            .catch(error => res.status(400).json({
                error
            }));
    } else if (req.body.like === -1) { // il s'agit d'un dislike //
        //---- Modifie les (dis)likes ---//
        Sauce.updateOne({
                _id: req.params.id
            }, {
                //---- on envoie dans le tableau des dislikes l'userID ----//
                $push: {
                    usersDisliked: req.body.userId
                }
            }, {
                //---- on ajoute un dislike ----//
                $inc: {
                    dislikes: +1
                },
            })
            .then(() => res.status(200).json({
                message: 'dislike ajouté !'
            }))
            //---- gestion de l'erreur ----//
            .catch(error => res.status(400).json({
                error
            }));
    } else { // il s'agit d'une annulation //
        //---- Modifie les (dis)likes ---//
        Sauce.findOne({
                _id: req.params.id
            })
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) { // si il s'agit d'annuler un like
                    //---- Modifie les (dis)likes ---//
                    Sauce.updateOne({
                            _id: req.params.id
                        }, {
                            //---- on retire dans le tableau des likes l'userID ----//
                            $pull: {
                                usersLiked: req.body.userId
                            },
                            //---- on retire un like ----//
                            $inc: {
                                likes: -1
                            },
                        })
                        .then(() => res.status(200).json({
                            message: 'like annulé'
                        }))
                        //---- gestion de l'erreur ----//
                        .catch(error => res.status(400).json({
                            error
                        }));
                } else if (sauce.usersDisliked.includes(req.body.userId)) { //si il s'agit d'annuler un dislike
                    //---- Modifie les (dis)likes ---//
                    Sauce.updateOne({
                            _id: req.params.id
                        }, {
                            //---- on retire l'userID du tableau de dislike ----//
                            $pull: {
                                usersDisliked: req.body.userId
                            },
                            //---- on retire un like ----//
                            $inc: {
                                dislikes: -1
                            },
                        })
                        .then(() => res.status(200).json({
                            message: 'dislike annulé'
                        }))
                        //---- gestion de l'erreur ----//
                        .catch(error => res.status(400).json({
                            error
                        }));
                }
            })
            //---- gestion de l'erreur ----//
            .catch(error => res.status(400).json({
                error
            }));
    }
}