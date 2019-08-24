const Cuadro            = require('../models/cuadro');
const cloudinary        = require('cloudinary');
cloudinary.config({
    cloud_name: 'mg-electronica',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
    //CUADROS INDEX
    async cuadroIndex(req, res, next) {
        let cuadros = await Cuadro.find({});
        res.render('cuadros/index', { cuadros: cuadros });
    },

    //CUADROS NEW
    cuadroNew(req, res, next) {
        res.render('cuadros/new');
    },

    //CUADROS CREATE
    async cuadroCreate(req, res, next) {
        req.body.cuadro.images = [];
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.cuadro.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        let cuadro = await Cuadro.create(req.body.cuadro);
        res.redirect(`/cuadros/${cuadro.id}`);
    },

    //CUADROS SHOW
    async cuadroShow(req, res, next) {
        let cuadro = await Cuadro.findById(req.params.id);
        res.render('cuadros/show', { cuadro });
    },

    //CUADROS EDIT
    async cuadroEdit(req, res, next) {
        let cuadro = await Cuadro.findById(req.params.id);
        res.render('cuadros/edit', { cuadro });
    },

    //CUADROS UPDATE
    async cuadroUpdate(req, res, next) {
        // find the cuadro id
       let post = await Post.findById(req.params.id);
       // check if there's any images for deletion
       if (req.body.deleteImages && req.body.deleteImages.length) {
           // assign deleteImages from req.body to its own variable
           let deleteImages = req.body.deleteImages;

           //loop over deleteImages
           for (const public_id of deleteImages) {
               //delete images from cloudinary
               await cloudinary.v2.uploader.destroy(public_id);
               //delete image from post.image
               for (const image of post.images) {
                   if (image.public_id === public_id) {
                       let index = post.images.indexOf(image);
                       post.images.splice(index, 1);
                   }
               }
           }  
       }
    }
}