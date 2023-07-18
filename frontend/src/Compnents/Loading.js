import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div>
      <Spinner animation="border" size="sm" />
      <Spinner animation="border" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" />
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Loading;
