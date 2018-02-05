const createOpts = (body, token) => ({
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json',
    Authorization: token
  }),
  mode: 'cors',
  body: JSON.stringify(body)
});

module.exports = {
  createOpts
};

