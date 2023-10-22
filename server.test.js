const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');
const CsvData = require('./src/csvData.model');
const { handleCsvUpload, getPaginatedData } = require("./src/csvUpload");

describe('POST /upload', () => {
  beforeAll(async () => {
    // Connect to a test database before running the tests
    await mongoose.connect('mongodb://localhost:27017/noapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the CsvData collection after each test
    await CsvData.deleteMany({});
  });

  it('should upload a valid CSV file and return 200 status', async () => {
    const csvContent = 'name,age,email,address\nAlice,30,alice@example.com,123 Main St';
    const response = await request(app)
      .post('/upload')
      .attach('file', Buffer.from(csvContent), { filename: 'test.csv' });

    expect(response.status).toBe(200);
    expect(response.body.invalidRecords).toHaveLength(0);
    expect(response.body.validRecords).toHaveLength(1);
  });

  it('should handle no file uploaded and return 400 status', async () => {
    const invalidCsvContent = 'invalid csv content';
    const response = await request(app)
      .post('/upload')
      .send({ csvData: invalidCsvContent });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No file uploaded.');
  });
});

describe('GET /data', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/noapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await getPaginatedData(1,10);
    
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  it('should retrieve paginated data and return 200 status', async () => {
    const response = await request(app)
      .get('/data')
      .query({ page: 1, pageSize: 1 });

    expect(response.status).toBe(200);

  });

});
