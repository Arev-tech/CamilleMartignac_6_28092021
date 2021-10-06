const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const TOKEN_STRING = process.env.TOKEN_STRING;
module.exports = (req, res, next) => {
    try {
        //---- extraction du token ----//
        const token = req.headers.authorization.split(' ')[1];
        //---- décode du token ----//
        const decodedToken = jwt.verify(token, TOKEN_STRING);
        const userId = decodedToken.userId;
        //---- si les id ne correspondent pas ----//
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error | 'Requête non authentifiée !'
        });
    }
};