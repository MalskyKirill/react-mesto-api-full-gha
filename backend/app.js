const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routs/index');
const { requestLogger, errorLogger } = require('./midlewares/logger');

const handleError = require('./midlewares/handleError');

const PORT = 3000;

// подключение к бд
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('подключение к бд');
  });

const app = express(); // создаем обьект приложения

app.use(cors()); // подлючили корс

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter); // применили промежуточное ПО для ограничения скорости ко всем запросам

app.use(helmet());

app.use(bodyParser.json()); // подключили бодипарсер

app.use(requestLogger); // подключаем логгер запросов

// роуты
app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// мидлварина для обработки ошибок
app.use(handleError);

// начинаем прослушивать подключение на PORT
app.listen(PORT, () => {
  console.log('сервер запущен');
});
