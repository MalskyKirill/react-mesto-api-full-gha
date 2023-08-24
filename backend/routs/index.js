const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../utils/errors/NotFoundError');
const auth = require('../midlewares/auth');

router.use('/', authRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', () => {
  throw new NotFoundError('Page Not Found');
});

module.exports = router;
