const express = require('express');
const request = require('supertest');
const { ObjectId } = require('mongodb');

// Mock the DB layer so these are true unit tests: no real MongoDB connection.
jest.mock('../config/db', () => ({
  getCollection: jest.fn()
}));

const { getCollection } = require('../config/db');
const applicationRoutes = require('../routes/applicationRoutes');

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/applications', applicationRoutes);
  return app;
}

describe('GET /applications', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns 200 and the full list of applications', async () => {
    const fakeApplications = [
      { _id: new ObjectId(), status: 'pending' },
      { _id: new ObjectId(), status: 'approved' }
    ];
    getCollection.mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue(fakeApplications)
      })
    });

    const res = await request(buildApp()).get('/applications');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[1].status).toBe('approved');
  });

  it('returns 500 when the database call fails', async () => {
    getCollection.mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockRejectedValue(new Error('DB down'))
      })
    });

    const res = await request(buildApp()).get('/applications');

    expect(res.status).toBe(500);
  });
});

describe('GET /applications/:id', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns 200 and the matching application when found', async () => {
    const id = new ObjectId();
    const fakeApplication = { _id: id, status: 'pending' };
    getCollection.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(fakeApplication)
    });

    const res = await request(buildApp()).get(`/applications/${id.toString()}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('pending');
  });

  it('returns 404 when no application matches the id', async () => {
    const id = new ObjectId();
    getCollection.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null)
    });

    const res = await request(buildApp()).get(`/applications/${id.toString()}`);

    expect(res.status).toBe(404);
  });

  it('returns 500 when the id is not a valid ObjectId', async () => {
    getCollection.mockReturnValue({
      findOne: jest.fn()
    });

    const res = await request(buildApp()).get('/applications/not-a-valid-id');

    expect(res.status).toBe(500);
  });
});
