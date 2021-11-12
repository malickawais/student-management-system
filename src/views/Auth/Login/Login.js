import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Redirect, useHistory, useLocation } from 'react-router';
import { login } from '../../../api/fakeapi';
import { checkValidity } from '../../../utility';

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);

  let location = useLocation();
  const history = useHistory();

  let from = location.state?.from?.pathname || '/';

  console.log(location);

  const [state, setState] = useState({
    username: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    password: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 8,
      },
    },
  });

  const onChangeHandler = (e, formKey) => {
    setState({
      ...state,
      [formKey]: {
        ...state[formKey],
        value: e.target.value,
        valid: true,
      },
    });
  };

  useEffect(() => {}, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let isValid = true;
      let stateCopy = { ...state };
      Object.keys(stateCopy).forEach((stateKey) => {
        stateCopy[stateKey].valid = checkValidity(
          state[stateKey].value,
          state[stateKey].rules
        );
        isValid = isValid && stateCopy[stateKey].valid;
      });
      setState(stateCopy);
      if (isValid) {
        setLoading(true);
        const user = await login(state.username.value, state.password.value);
        onLogin && onLogin(user);
        history.push(from);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  if (localStorage.getItem('user')) {
    return <Redirect to='/' />;
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} lg={6} xl={4}>
          <Form className='border p-4 mt-4 rounded shadow-sm bg-white'>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={state.username.value}
                isInvalid={!state.username.valid}
                onChange={(e) => onChangeHandler(e, 'username')}
                placeholder='Enter username'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={state.password.value}
                isInvalid={!state.password.valid}
                onChange={(e) => onChangeHandler(e, 'password')}
                type='password'
                placeholder='Password'
              />
            </Form.Group>

            <Button
              disabled={loading}
              onClick={onSubmit}
              variant='primary'
              type='submit'
            >
              Submit
              {loading && (
                <Spinner
                  className={'ms-2'}
                  size='sm'
                  animation='border'
                  role='status'
                >
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
