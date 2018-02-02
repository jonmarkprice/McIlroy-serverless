const { S3_URL } = process.env;

module.exports = () => (`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <p>Hello <span id="user"><span></p>
    <a id="sign-out" href="logout">Log out</a>
    
    <h2>Test your token</h2>
    <button id="test">Test</button>
    <code id="test-result"></code>


    <script src="${S3_URL}/scripts/profile.bundle.js"></script>
  </body>
  </html>
`);
