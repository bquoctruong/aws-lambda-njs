exports.handler = async (event) => {
  // Example: Log the event object for debugging purposes
  console.log("Received event:", JSON.stringify(event, null, 2));

  // Example: Parsing parameters from the event
  const name = event.queryStringParameters?.name || "World";

  // Example: Create a response object
  const response = {
      statusCode: 200,
      body: JSON.stringify({
          message: `Hello, ${name}! Welcome to AWS Lambda.`,
      }),
  };

  // Return the response object
  return response;
};
