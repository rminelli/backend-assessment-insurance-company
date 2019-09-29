const request = require('supertest');
const app = require('../src/app.js')

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the api path', () => {
  test('It should response the GET method', (done) => {
      request(app).post('/api/').then((response) => {
          expect(response.statusCode).toBe(404);
          done();
      });
  });
});


describe('Test the generate client token', () => {
test('Get a valid token', async(done) => {
  const service = {
      name: "Jacquelyna",
      email: "jacquelynblankenship@quotezart.com"
  };
  try {
      const count = await Service.count();
      await request(app).post('/api/').send(service)
      const newCount = await Service.count()
      expect(response.statusCode).toBe(200);
      done()
  } catch (err) {
      // write test for failure here
      console.log(`Error ${err}`)
      done()
  }
})
})