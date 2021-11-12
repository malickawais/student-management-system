import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

export default function TeacherDetailsReport({ teacher, loading }) {
  return (
    <Container>
      {loading && (
        <Spinner className={'ms-2'} size='sm' animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      <Row>
        {Object.keys(teacher).map((teacherKey) => (
          <Row>
            <Col>
              <h4>{teacherKey}</h4>
            </Col>
            <Col>{teacher[teacherKey]}</Col>
          </Row>
        ))}
      </Row>
    </Container>
  );
}
