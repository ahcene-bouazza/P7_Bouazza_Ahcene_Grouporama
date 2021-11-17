// Importation du package multer
const multer = require('multer');                                       

const storage = multer.diskStorage({
  // Destination du fichier sur le disque  root "images"                                
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
 // Configuration du nom du fichier (nom + extension + date)
  filename: (req, file, callback) => {                                 
    const fileName = file.originalname.split('.')[0]
    const extension = file.originalname.split('.')[1]
    const name = fileName.split(' ').join('_');
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('file');