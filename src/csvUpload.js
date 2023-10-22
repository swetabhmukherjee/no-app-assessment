const CsvData = require("../src/csvData.model");

async function handleCsvUpload(fileBuffer) {
  const csvData = fileBuffer
    .toString()
    .split("\n")
    .map((row, index) => {
      // Skip the header row
      if (index === 0) {
        return null;
      }

      const [name, age, email, address] = row.split(",");
      const errors = [];
      if (!name || !age || !email || !address) {
        errors.push("Invalid data format.");
      } else {
        // Parse age as a number
        const parsedAge = parseInt(age, 10);
        if (isNaN(parsedAge) || parsedAge < 0) {
          errors.push("Invalid age.");
        }
        // Validate email format
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
          errors.push("Invalid email.");
        }
      }

      if (errors.length > 0) {
        return { index: index, errors: errors };
      }

      return { name, age: parseInt(age, 10), email, address };
    })
    .filter((record) => record !== null); // Remove null values (skipped header row)

  const invalidRecords = csvData.filter((record) => record.errors);
  const validRecords = csvData.filter((record) => !record.errors);

  await CsvData.insertMany(validRecords);
  return { invalidRecords, validRecords };
}

module.exports = handleCsvUpload;
