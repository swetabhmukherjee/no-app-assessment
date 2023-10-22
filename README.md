# Bulk Data Upload API

This Node.js API allows users to upload a large dataset in CSV format. It performs validation on the uploaded data and handles errors gracefully. The API stores valid data and provides information on validation errors.

## Getting Started

### Prerequisites

- Node.js installed on your machine. [Download Node.js](https://nodejs.org/)

### Installing Dependencies

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <directory>
   ```

3. Install dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Application

1. Start the Node.js server:

   ```bash
   npm start
   # or
   yarn start
   ```

   The server will be running at `http://localhost:3000`.

## Uploading Data

To upload data, send a POST request to the `/upload` endpoint with a CSV file attached:

```bash
curl -X POST -F "file=@data.csv" http://localhost:3000/upload
```

Replace `data.csv` with the path to your CSV file.

## Running Tests

To run tests, execute the following command:

```bash
npm test
# or
yarn test
```

This will run the Jest test suite and provide information about test coverage and results.

## API Endpoints

### POST /upload

Uploads a CSV file containing data.

- **Request:**
  - Method: POST
  - Endpoint: `/upload`
  - Body: Form data with a CSV file attached

- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "invalidRecords": [],
      "validRecords": [
        {
          "name": "Alice",
          "age": 30,
          "email": "alice@example.com",
          "address": "123 Main St"
        }
      ]
    }
    ```

### GET /data

Retrieves paginated data from the database.

- **Request:**
  - Method: GET
  - Endpoint: `/data`
  - Query Parameters:
    - `page` (optional, default: 1) - Current page number
    - `pageSize` (optional, default: 10) - Number of records per page

- **Response:**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "totalRecords": 1,
      "totalPages": 1,
      "currentPage": 1,
      "pageSize": 1,
      "data": [
        {
          "name": "Alice",
          "age": 30,
          "email": "alice@example.com",
          "address": "123 Main St"
        }
      ]
    }
    ```