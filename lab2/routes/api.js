const bodyParser = require('body-parser');
const router = require('express').Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const userRouter = require('./users');
router.use('/users', userRouter);

const tariffRouter = require('./tariffs');
router.use('/tariffs', tariffRouter);

const mediaRouter = require('./media');
router.use('/media', mediaRouter);

module.exports = router;