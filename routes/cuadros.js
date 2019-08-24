const express       = require('express');
const router        = express.Router();
const multer        = require('multer');
const upload = multer({'dest': 'uploads/'});
const { asyncErrorHandler } = require('../middleware');
const { 
    cuadroIndex,
    cuadroNew,
    cuadroCreate,
    cuadroShow,
    cuadroEdit,
    cuadroUpdate,
    cuadroDestroy
  } = require('../controllers/cuadros');


/* GET cuadros index /cuadros */
router.get('/', asyncErrorHandler(cuadroIndex));

/* GET cuadros new /cuadros/new */
router.get('/new', cuadroNew);

/* POST cuadros create /cuadros */
router.post('/', upload.array('images', 4), asyncErrorHandler(cuadroCreate));

/* GET cuadros show /cuadros/:id */
router.get('/:id', asyncErrorHandler(cuadroShow));

/* GET cuadros edit /cuadros/:id/edit */
router.get('/:id/edit', asyncErrorHandler(cuadroEdit));

/* PUT cuadros update /cuadros/:id */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(cuadroUpdate));

/* DELETE cuadros destroy /cuadros/:id */
router.delete('/:id', asyncErrorHandler(cuadroDestroy));

module.exports = router;

