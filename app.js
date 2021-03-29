const express = require('express');
const cors = require('cors');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const normaliseErrorMessage = require('ajv-error-messages');
const { RumourSchema } = require('./validators');

const app = express();
app.use(express.json());
app.use(cors());

const { validate } = new Validator({ allErrors: true });

app.get('/', (req, res) => {
  res.send("I'm expressing with my full capabilities!");
});

app.post('/rumour', validate({ body: RumourSchema }), (req, res) => {
  const { date: { year, month, day } } = req.body;

  const rumourDate = new Date(year, month - 1, day);

  if (rumourDate > new Date()) {
    return res.status(400).json({ message: 'invalid date' });
  }

  res.status(200).json({ message: 'accepted' });
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorDetails = normaliseErrorMessage(err.validationErrors.body);
    res.status(400).json({ message: 'invalid', errors: errorDetails });
    next();
  } else next(err);
});

module.exports = app;
