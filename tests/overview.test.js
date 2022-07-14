/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Overview from '../client/src/components/Overview/Overview.jsx';
// import styleData from '../client/src/components/Overview/data.json';
import {render} from '@testing-library/react'
import TestRenderer from 'react-test-renderer';


// it('renders overview correctly', () => {
//   const tree = TestRenderer
//     .create(<Overview id={66645} />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Overview />, div);
//   ReactDOM.unmountComponentAtNode(div);
// })