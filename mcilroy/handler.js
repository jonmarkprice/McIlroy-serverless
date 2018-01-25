'use strict';

exports.handler.login = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: `
<!DOCTYPE html>
<html>
  <head>
    <title>McIlroy</title>
    <link rel="stylesheet" href="https://mcilroy.s3-us-west-1.amazonaws.com/index.css" />
  </head>
  <body>
    <h1>SSR Test</h1>
    <form>
        <input type="text" name="test" />
    </form>
  </body>
</html>`,
        headers: {
          "Content-Type": "text/html"
        }
    }
    callback(null, response);
};
