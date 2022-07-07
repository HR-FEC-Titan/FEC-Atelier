import React from 'react';

class Overview extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return <div>
      <h1>Product Overview: {this.props.id}</h1>
    </div>
  }
}

export default Overview;