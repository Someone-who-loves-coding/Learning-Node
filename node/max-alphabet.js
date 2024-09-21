const express = require('express');

const app = express();
const port = 3000; // Replace with your desired port

app.use(express.json());

app.get('/', (req, res) => {
  // Handle GET requests
  const operationCode = generateOperationCode(); // Implement your logic to generate the operation code
  res.json({ operation_code: operationCode });
});

app.post('/', (req, res) => {
  // Handle POST requests
  const requestData = req.body; // Access the request data from the request body

  // Define required keys
  const requiredKeys = [
    'status',
    'userId',
    'collegeEmailId',
    'collegeRollNumber',
    'numbers',
    'alphabets'
  ];

  // Check if all required keys are present
  const isDataComplete = requiredKeys.every(key => requestData.hasOwnProperty(key));

  if (!isDataComplete) {
    // If any key is missing, return an error response
    res.status(400).json({ success: false, message: 'Missing required fields' });
    return;
  }

  // Extract information from requestData
  const status = requestData.status;
  const userId = requestData.userId;
  const collegeEmailId = requestData.collegeEmailId;
  const collegeRollNumber = requestData.collegeRollNumber;
  const numbersArray = requestData.numbers;
  const alphabetsArray = requestData.alphabets;

  // Process the data and generate a response
  const response = {
    status,
    userId,
    collegeEmailId,
    collegeRollNumber,
    numbers: numbersArray,
    alphabets: alphabetsArray
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});