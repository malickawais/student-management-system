import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

export default function StudendDetailsReport({ student, loading }) {
  return (
    <Container>
      {loading && (
        <Spinner className={'ms-2'} size='sm' animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      <Row>
        {Object.keys(student).map((studentKey) => (
          <Row>
            <Col>
              <h4>{studentKey}</h4>
            </Col>
            <Col>{student[studentKey]}</Col>
          </Row>
        ))}
      </Row>
    </Container>
  );
}
