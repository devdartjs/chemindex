import app from '../app.js';
import * as chai from 'chai';
import request from 'supertest';

const expect = chai.expect;

describe('User routes', () => {
    describe('non critical routes', () => {
        it('GET /api/v1/users should return correct text', async () => {

            

            const res = await request(app).get('/api/v1/users');

            expect(res.status).to.equal(200);
            expect(res.text).to.equal('that is my index page');
        });
    });
});
