const axios = require('axios');

test('should have status code of 200', () => {
  axios.get('http://localhost:3000')
    .then((res) => {
      expect(res.status).toBe(200);
    })
});