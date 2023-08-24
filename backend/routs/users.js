const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regExpUrl = require('../utils/regUrl');

const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers); // получить всех пользователей

router.get('/me', getCurrentUser); // получить информацию о пользователе

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUserById,
); // получит пользователя по id

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserProfile,
); // обновить информацию о пользователе

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .regex(regExpUrl),
    }),
  }),
  updateUserAvatar,
); // обновить аватар

module.exports = router;
