// Mock the database pool before requiring any modules that use it
jest.mock('../db', () => {
  const mockPool = {
    query: jest.fn(),
    end: jest.fn().mockResolvedValue(true)
  };
  return mockPool;
});

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../server');
const pool = require('../db');

describe('Booking Endpoint', () => {
  let token;

  beforeEach(() => {
    // Create a valid JWT token for testing
    token = jwt.sign({ id: 1, username: 'testuser' }, process.env.JWT_SECRET || 'test_secret');

    // Reset mock calls between tests
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Close the server after all tests
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // Give time for server to close
  });

  test('Should create a booking successfully', async () => {
    // Mock database responses
    pool.query.mockImplementation((query, params) => {
      if (query.includes('select field_id, slot_id from Field')) {
        return [[{ field_id: 1 }]]; // Mock field query response
      } else if (query.includes('select slot_id from TimeSlot')) {
        return [[{ slot_id: 2 }]]; // Mock slot query response
      } else if (query.includes('insert into Booking')) {
        return [{ insertId: 123 }]; // Mock insert response
      }
      return [[]];
    });

    const response = await request(app)
      .post('/booking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sportType: 'football',
        startTime: '10:00:00',
        date: '2025-05-25',
        userID: 1
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('bookingId', 123);
    expect(pool.query).toHaveBeenCalledTimes(3);
  });

  test('Should return 404 when field not found', async () => {
    // Mock empty field response
    pool.query.mockImplementation((query) => {
      if (query.includes('select field_id, slot_id from Field')) {
        return [[]]; // Empty result for field query
      }
      return [[]];
    });

    const response = await request(app)
      .post('/booking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sportType: 'nonexistent',
        startTime: '10:00:00',
        date: '2025-05-25',
        userID: 1
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Field not found');
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test('Should return 404 when slot not found', async () => {
    // Mock field found but slot not found
    pool.query.mockImplementation((query) => {
      if (query.includes('select field_id, slot_id from Field')) {
        return [[{ field_id: 1 }]]; // Mock field query response
      } else if (query.includes('select slot_id from TimeSlot')) {
        return [[]]; // Empty result for slot query
      }
      return [[]];
    });

    const response = await request(app)
      .post('/booking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sportType: 'football',
        startTime: 'nonexistent',
        date: '2025-05-25',
        userID: 1
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Slot not found');
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test('Should return 401 when no token provided', async () => {
    const response = await request(app)
      .post('/booking')
      .send({
        sportType: 'football',
        startTime: '10:00:00',
        date: '2025-05-25',
        userID: 1
      });

    expect(response.statusCode).toBe(401);
  });

  test('Should handle database errors gracefully', async () => {
    // Mock database error
    pool.query.mockImplementation(() => {
      throw new Error('Database error');
    });

    const response = await request(app)
      .post('/booking')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sportType: 'football',
        startTime: '10:00:00',
        date: '2025-05-25',
        userID: 1
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error', 'Database error');
  });
});
