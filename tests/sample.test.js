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

describe('Test the generate client token', () => {
  test('It should response the GET method', (done) => {
      request(app).post('/api/').then((response) => {
          expect(response.statusCode).toBe(404);
          done();
      });
  });
});