const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

it('Checks itself before it wrecks itself', async (done) => {
  const res = await request.get('/');
  expect(res.status).toBe(200);
  expect(res.text).toBe("I'm expressing with my full capabilities!");
  done();
});

it('Valid message', async (done) => {
  const res = await request.post('/rumour')
    .send({ companyName: 'acme', date: { day: 27, month: 3, year: 2021 } });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('accepted');
  done();
});

it('Invalid message: failed schema', async (done) => {
  const res = await request.post('/rumour')
    .send({ companyName: 'acme', date: { month: 0, year: 2021 } });
  expect(res.status).toBe(400);
  expect(res.body.message).toBe('invalid');
  expect(res.body.errors).toMatchObject({ fields: { date: ["Should have required property 'day'"], 'date.month': ['Should be >= 1'] } });
  done();
});

it('Invalid message: future date', async (done) => {
  const res = await request.post('/rumour')
    .send({ companyName: 'acme', date: { day: 27, month: 3, year: 3021 } });
  expect(res.status).toBe(400);
  expect(res.body.message).toBe('invalid date');
  done();
});
