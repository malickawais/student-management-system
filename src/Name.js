import React from 'react';

class Name extends React.Component {
  render() {
    return <p>My name is {this.props.username}</p>;
  }
}

export default Name;
