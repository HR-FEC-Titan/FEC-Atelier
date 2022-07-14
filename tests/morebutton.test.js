import React from 'react';
import ReviewList from './ReviewList.jsx';

test('should have a length of 2', () => {
  axios.get('http://localhost:3000')
    .then((res) => {
      expect(res.status).toBe(200);
    })
});