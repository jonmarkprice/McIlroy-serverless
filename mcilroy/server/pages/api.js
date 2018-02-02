const { S3_URL } = process.env;

module.exports = () => (`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>McIlroy API test</title>
  </head>
  <body>
    <h1>API Test</h1>

    <form id="program-form">
      <label>
        Program Name:
        <input type="text" id="program-name" />
      </label>
      <label>
        Program:
        <input type="text" id="program" />
      </label>
      <input type="submit" value="Run" />
    </form>
    <button id="save">Save</button>

    <p id="result"></p>

    <h2>Programs</h2>
    <ol id="programs-list">
    </ol>

    <script src="${S3_URL}/scripts/api.bundle.js"></script>
  </body>
</html>`);
