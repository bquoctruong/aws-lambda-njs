exports.handler = async (event) => {
    // Your Lambda logic here
    return {
      statusCode: 200,
      body: JSON.stringify('Hello World, Lambda!'),
    };
  };