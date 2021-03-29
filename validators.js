module.exports.RumourSchema = {
  type: 'object',
  required: ['date', 'companyName'],
  properties: {
    date: {
      type: 'object',
      required: ['day', 'month', 'year'],
      properties: {
        day: {
          type: 'integer',
          maximum: 31,
          minimum: 1,
        },
        month: {
          type: 'integer',
          maximum: 12,
          minimum: 1,
        },
        year: {
          type: 'integer',
          minimum: 100,
        },
      },
    },
    companyName: {
      type: 'string',
      minLength: 1,
    },
    amount: {
      type: 'number',
    },
    currency: {
      type: 'string',
      minLength: 1,
    },
    sourceCodename: {
      type: 'string',
      minLength: 1,
    },
    isTrustedSource: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
};
