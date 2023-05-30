// api.test.ts
import request from 'supertest';
import { NextApiRequest, NextApiResponse } from 'next';
import { createServer } from 'http';
import { apiEndpointHandler } from './handler/endpoint';
import { APIDomain } from '@/apis/baseURL';

const handler: any = (req: NextApiRequest, res: NextApiResponse) => {
  return apiEndpointHandler(req, res);
};

describe('API Tests', () => {
  let server: any;

  beforeAll(() => {
    server = createServer(handler);
    server.listen()
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return the correct response from the API endpoint', async () => {
    const response = await request(APIDomain).get('/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('users');
  });
});