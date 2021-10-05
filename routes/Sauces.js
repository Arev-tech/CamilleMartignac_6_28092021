const express = require ('express');
const router = express.Router();

const sauceCtrl = require('../controllers/Sauces');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//---- GET method récupération toutes les sauces si authentification réussie ----//
router.get('/', auth, sauceCtrl.getAllSauces);

//---- GET method récupération d'une sauce si authentification réussie ----//
router.get('/:id', auth, sauceCtrl.getOneSauce);

//---- POST method créer une sauce si authentification réussie ----//
router.post('/', auth, multer, sauceCtrl.createSauce);

//---- PUT method modifier une sauce si auhtentifiaction réussie ----//
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//---- DELETE method supprimer une sauce si authentification réussie ----//
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//---- POST method gérer les (dis)likes si authentification réussie ----//
router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

module.exports = router;