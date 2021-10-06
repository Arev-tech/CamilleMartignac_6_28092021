const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//---- créer une constante qui garde la logique qui indique où enregistrer les fichiers entrant ----//
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //----enregistrement dans le dossier images ----//
        callback(null, 'images');
    },
    //---- construction du nom du fichier ----//
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//---- exportation de l'élément multer en indiquant que l'on ne gère que les images ----//
module.exports = multer({
    storage: storage
}).single('image');