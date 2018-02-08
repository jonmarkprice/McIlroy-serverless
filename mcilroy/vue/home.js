const version = "0.2.2";
console.log("script loaded, version %s", version);

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
      fetch('/dev/sessions/api/save', opts)
      .then(raw => {
        console.log("Raw response");
        console.log(raw);
        return raw;
      })
      .then(res => res.json())
      .then(body => {
        console.log("session: %s", body.session);
        console.log(body);
      })
      .catch(err => { alert(err); }); 
    }
  }
});
