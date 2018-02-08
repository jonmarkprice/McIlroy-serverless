const version = "0.2.4";
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
        console.log(body);
        // Try to set two cookies
        // Paths and other options need to be the same as
        // cookies on the server, or log-out will fail.
        // TODO:
        // Need to add a function to purge sessions on logout as well.
        // Should also add a timestamp to the database and purge *all*
        // after that time has elapsed...
        // Who should call that function, and when?
        // It could be:
        // 1. something that is run every N logins... 
        document.cookie=`username=${body.username};path=/dev/`;
        document.cookie=`session=${body.session};path=/dev/`;
        window.location.href = "/dev/sessions/home";
      })
      .catch(err => { alert(err); }); 
    }
  }
});
