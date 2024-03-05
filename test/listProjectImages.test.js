// Import necessary libraries for testing
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
AWSMock.setSDKInstance(AWS);
const { handler } = require('../listProjectImages'); // Adjust the path as necessary

// Mocking S3 service before all tests
beforeAll(() => {
  AWSMock.mock('S3', 'listObjectsV2', (params, callback) => {
    // Your mock configuration here
    callback(null, {
      Contents: [
        // Mocked S3 response contents
        { Key: 'Trippets/image1.png' },
        // Add more mocked keys if needed
      ],
    });
  });
});

// Restoring AWS SDK to original state after all tests
afterAll(() => {
  AWSMock.restore('S3');
});

// Test to check if the array contains a specific URL
test('Array returned contains a specific image URL', async () => {
  // Define the event to mimic API Gateway event structure
  const event = {
    pathParameters: {
      projectName: 'Trippets'
    }
  };

  // Invoke the handler function as if it's triggered by an API Gateway event
  const result = await handler(event);

  // Parse the result body to JSON
  const body = JSON.parse(result.body);

  // Check if the function returns the expected status code
  expect(result.statusCode).toBe(200);

  // Check if the body contains the specific URL
  const expectedUrl = "https://harbourcontractorsimages.s3.eu-west-2.amazonaws.com/Trippets%2Fimage1.png";
  expect(body).toContain(expectedUrl);
});
