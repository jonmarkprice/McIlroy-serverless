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
      <button>Log In</button>

      <button v-on:click="echo">Echo</button>
    </div>
    <script>
<!-- just put here instead -->
console.log('script loaded');

new Vue({ 
  el: '#app', 
  data: { 
    username: 'default' 
  },
  methods: {
    echo: function() {
      console.log('Username: %s', this.username);
    }
  }
});

<!-- -->
    </script>
  </body>
</html>`;

