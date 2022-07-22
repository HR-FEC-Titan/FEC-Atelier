import React from 'react';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: "5px",
    width: '75%',
    backgroundColor: "#e0e0de",
    margin: "0px 3px"
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: "#616161",
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}></span>
      </div>
    </div>
  );
};

export default ProgressBar;
