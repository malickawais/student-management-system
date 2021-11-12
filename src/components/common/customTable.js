import React, { Component, useEffect, useState } from 'react';
import {
  Toast,
  ToastContainer,
  Table,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CustomTable = (props) => {
  const [show, setShow] = useState(false);
  const attendence = {
    isPresent: false,
    isAbsent: false,
  };

  return (
    <div>
      <ToastContainer position='top-end'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000}>
          <Toast.Header>
            <strong className='me-auto'>Hurrehhh!</strong>
            <small>Chal gya b chal gya</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container>
        <Row>
          <Col>
            <Table className='mt-2' striped bordered hover variant='dark'>
              <thead>
                <tr>
                  {props.headingArray.map((heading, index) => {
                    return <th key={heading}>{heading}</th>;
                  })}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.list.map((row, index) => (
                  <tr key={row[props.uniqueTrait]}>
                    {Object.keys(row).map((rowKey) => {
                      return (
                        <td>
                          {rowKey === props.linkKey ? (
                            <NavLink
                              to={`${props.link.to}/${row[props.uniqueTrait]}`}
                            >
                              {row[rowKey]}
                            </NavLink>
                          ) : (
                            row[rowKey]
                          )}
                        </td>
                      );
                    })}
                    <td>
                      {props.renderActions &&
                        props.renderActions(row[props.uniqueTrait])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default CustomTable;
