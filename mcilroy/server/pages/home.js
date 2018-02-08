const S3_URL = "https://mcilroy.s3-us-west-1.amazonaws.com"
module.exports = () => 
`<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Session Home</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  <head>
  <body>
    <div id="app">
      <legend>Set username</legend>
      <input type="text" v-model="username" />
      <button v-on:click="storeCookie">Log In</button>
      <button v-on:click="echo">Echo username</button>
    </div>
    <script src="${S3_URL}/scripts/home.js">
    </script>
  </body>
</html>`;

