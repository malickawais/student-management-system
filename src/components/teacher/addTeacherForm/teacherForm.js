import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { addTeacher } from '../../../api/fakeapi';
import { checkValidity } from '../../../utility';

export default function AddTeacherForm(props) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    teacherName: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    teacherSubject: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    lectureDay: {
      value: '',
      valid: undefined,
      rules: {
        minLength: 3,
      },
    },
    designation: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        isNumeric: true,
      },
    },
    email: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        isEmail: true,
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
        const newTeacherList = await addTeacher({
          name: state.teacherName.value,
          teacherSubject: state.teacherSubject.value,
          section: state.lectureDay.value,
          phone: state.designation.value,
          rollNo: state.email.value,
        });
        setLoading(false);
        props.onAdd(newTeacherList);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  console.log(state);

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label className='mt-2'>Teacher Name</Form.Label>
        <Form.Control
          value={state.teacherName.value}
          name='teacherName'
          isInvalid={state.teacherName.valid === false}
          onChange={(e) => onChangeHandler(e, 'teacherName')}
          placeholder='Enter teacher name'
        />
        <Form.Label className='mt-2'>Teacher's Subject</Form.Label>
        <Form.Control
          value={state.teacherSubject.value}
          name='teacherSubject'
          isInvalid={state.teacherSubject.valid === false}
          onChange={(e) => onChangeHandler(e, 'teacherSubject')}
          placeholder='Enter teacher Subject name'
        />
        <Form.Label className='mt-2'>Lecture Day</Form.Label>
        <Form.Control
          value={state.lectureDay.value}
          name='lectureDay'
          isInvalid={state.lectureDay.valid === false}
          onChange={(e) => onChangeHandler(e, 'lectureDay')}
          placeholder='Enter Teacher Lecture Day '
        />
        <Form.Label className='mt-2'>Email</Form.Label>
        <Form.Control
          value={state.email.value}
          isInvalid={state.email.valid === false}
          name='email'
          onChange={(e) => onChangeHandler(e, 'email')}
          placeholder='Enter Teacher Email'
        />
        <Form.Select
          value={state.designation.value}
          isInvalid={state.designation.valid === false}
          onChange={(e) => onChangeHandler(e, 'designation')}
          name='desig'
          className='mt-2'
          aria-label='Default select example'
        >
          <option>Select Designation</option>
          <option value='HOD'>HOD</option>

          <option value='Professor'>Professor</option>
          <option value='Assistant Professor'>Assistant Professor</option>
          <option value='Associate Professor'>Associate Professor</option>
          <option value='Lecturer'>Lecturer</option>
          <option value='Lab Supervisor'>Lab Supervisor</option>
          <option value='>others'>others</option>
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
