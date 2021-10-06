const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //---- extraction du token ----//
        const token = req.headers.authorization.split(' ')[1];
        //---- décode du token ----//
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
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