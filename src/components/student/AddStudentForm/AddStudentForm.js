import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { addStudent } from '../../../api/fakeapi';
import { checkValidity } from '../../../utility';

export default function AddStudentForm(props) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    fullName: {
      value: '',
      valid: true,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    fatherName: {
      value: '',
      valid: true,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    rollNumber: {
      value: '',
      valid: true,
      rules: {
        isNumeric: true,
        minLength: 3,
      },
    },
    section: {
      value: '',
      valid: true,
      rules: {
        required: true,
        isNumeric: true,
      },
    },
    phoneNumber: {
      value: '',
      valid: true,
      rules: {
        required: true,
        isNumeric: true,
      },
    },
  });

  const onChangeHandler = (e, formKey) => {
    setState({
      ...state,
      [formKey]: {
        ...state[formKey],
        value: e.target.value,
        valid: checkValidity(e.target.value),
      },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newStudentList = await addStudent({
        name: state.fullName.value,
        fatherName: state.fatherName.value,
        section: state.section.value,
        phone: state.phoneNumber.value,
        rollNo: state.rollNumber.value,
      });
      setLoading(false);
      props.onAdd(newStudentList);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label className='mt-2'>Full Name</Form.Label>
        <Form.Control
          value={state.fullName.value}
          isValid={state.fullName.valid}
          name='fullname'
          onChange={(e) => onChangeHandler(e, 'fullName')}
          placeholder='Enter full name'
        />
        <Form.Label className='mt-2'>Father's Name</Form.Label>
        <Form.Control
          value={state.fatherName.value}
          isValid={state.fatherName.valid}
          name='fathername'
          onChange={(e) => onChangeHandler(e, 'fatherName')}
          placeholder='Enter father name'
        />
        <Form.Label className='mt-2'>Phone Number</Form.Label>
        <Form.Control
          value={state.phoneNumber.value}
          isValid={state.phoneNumber.valid}
          name='phno'
          onChange={(e) => onChangeHandler(e, 'phoneNumber')}
          placeholder='Enter phone number'
        />
        <Form.Label className='mt-2'>Roll Number</Form.Label>
        <Form.Control
          value={state.rollNumber.value}
          isValid={state.rollNumber.valid}
          name='rno'
          onChange={(e) => onChangeHandler(e, 'rollNumber')}
          placeholder='Enter roll number'
        />
        <Form.Select
          value={state.section.value}
          isValid={state.section.valid}
          onChange={(e) => onChangeHandler(e, 'section')}
          name='section'
          className='mt-2'
          aria-label='Default select example'
        >
          <option>Select Section</option>
          <option value='1'>One</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
        </Form.Select>
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
  );
}
