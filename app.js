const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require("dotenv");
const mongooseExpressErrorHandler = require ( ' mongoose-express-error-handler ' ) ;
dotenv.config();

const MONGOOSE_URI = process.env.DATABASE
const saucesRoutes = require('./routes/Sauces')
const userRoutes = require('./routes/user');

//---- si vous voulez utiliser une autre base de donnée modifiez la valeur de MONGOOSE_URI ci-dessous ----//


//---- Connexion à la base de donnée MongoDB ----//
mongoose.connect(MONGOOSE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//---- Paramètres CORS pour toutes les routes  ----//
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(mongooseExpressErrorHandler);
//---- configurer les middlewares  ----//
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;