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
    <script>
console.log('script loaded');

new Vue({ 
  el: '#app', 
  data: { 
    username: 'default' 
  },
  methods: {
    echo: function() {
      console.log('Username: %s', this.username);
    },
    storeCookie: function() {
      // I think this can be async and 'just work'
      const opts = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        mode: 'cors',
        body: JSON.stringify({username: this.username})
      };
      fetch('api/store', opts)
      .then(res => res.json())
      .then(body => {
        console.log(body);
      })
      .catch(err => { alert(err); }); 
    }
  }
});
    </script>
  </body>
</html>`;

