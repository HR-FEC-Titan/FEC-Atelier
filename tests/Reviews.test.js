/**
 * @jest-environment jsdom
 */
import React from 'react';
import Reviews from '../client/src/components/Reviews/Reviews.jsx';

import {render} from '@testing-library/react'
test('loads items eventually', async () => {
  const {getByText} = render(<Reviews />)
  getByText('RATINGS & REVIEWS');
})