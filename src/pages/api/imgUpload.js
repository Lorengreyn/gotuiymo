const multer = require('multer');
const path = require('path');
import nextConnect from "next-connect";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images');
    },
    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    },
    fileFilter : (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}});

const app = nextConnect({
    onError(error, req, res) {
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });

  app.post(upload.array("file"), function (req, res) {  
    res.json(req.files.map((v)=>v.filename))
  });

const upload = multer({storage: storage});

const filePath = path.join(storage.destination,storage.filename);
console.log(filePath);

module.exports = {app, filePath}

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };