import React, { useEffect, useState } from 'react';
import { getTeachers } from '../../../api/fakeapi';

import Customtable from '../../../components/common/customTable';
import AppModal from '../../../components/common/Modal/Modal';
import AddTeacherForm from '../../../components/teacher/addTeacherForm/teacherForm';
import { Button, FormControl, Form, Row, Col } from 'react-bootstrap';

const TeacherList = () => {
  const [showAddTeacher, setShowAddTeacher] = useState(false);

  const [state, setState] = useState({
    teacherList: [],
    teacherLoading: false,
    allTeacher: [],
    headingArray: [
      'Teacher Name',
      'Teacher Subject',
      'Teacher Lecture Day',
      'Teacher Designation',
      'Teacher Email',
      ,
    ],
  });

  useEffect(() => {
    setState({ ...state, teacherLoading: true });
    getTeachers().then((techList) => {
      setState({
        ...state,
        teacherLoading: false,
        teacherList: techList,
        allTeacher: techList,
      });
    });
  }, []);

  const onDeleteHandler = (email) => {
    let filteredTeacherList = [...state.teacherList];
    filteredTeacherList = filteredTeacherList.filter((teacher) => {
      return teacher.email !== email;
    });
    setState({ ...state, teacherList: filteredTeacherList });
  };
  const onChangeHandler = (e) => {
    const querry = e.target.value;

    if (!e.target.value) {
      setState({ ...state, teacherList: state.allTeacher });
      return;
    }
    let reformedTeacherList = [...state.allTeacher];
    reformedTeacherList = reformedTeacherList.filter((teacher) => {
      return teacher.teacherName.toLowerCase().includes(querry.toLowerCase());
    });
    setState({ ...state, teacherList: reformedTeacherList });
  };
  const onResetHandler = () => {
    setState({ ...state, teacherList: state.allTeacher });
  };
  const selectHandler = (e) => {
    if (!e.target.value) {
      setState({ ...state, teacherList: state.allTeacher });
      return;
    }
    let filteredTeacherList = [...state.allTeacher];
    filteredTeacherList = filteredTeacherList.filter(
      (teacher) => teacher.designation == e.target.value
    );

    setState({ ...state, teacherList: filteredTeacherList });
  };

  return (
    <div>
      <div className='mt-3'>
        <div className='d-flex flex-row justify-content-between'>
          <Button size='sm' variant='warning' onClick={onResetHandler}>
            Reset Button
          </Button>
          <Button
            className='float-end'
            variant='primary'
            onClick={() => setShowAddTeacher(true)}
          >
            Add New Teacher
          </Button>
        </div>
        <Row className='mt-4'>
          <Col>
            <FormControl
              placeholder='Username'
              aria-label='Username'
              aria-describedby='basic-addon1'
              className='search-bar'
              placeholder='Enter here for search'
              onChange={onChangeHandler}
            />
          </Col>
          <Col>
            <Form.Select
              aria-label='Default select example'
              onChange={selectHandler}
              className='ss-section-select'
            >
              <option value=''>Select Designation</option>
              <option value='HOD'>HOD</option>

              <option value='Professor'>Professor</option>
              <option value='Assistant Professor'>Assistant Professor</option>
              <option value='Associate Professor'>Associate Professor</option>
              <option value='Lecturer'>Lecturer</option>
              <option value='Lab Supervisor'>Lab Supervisor</option>
              <option value='>others'>others</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
      <div>
        <Customtable
          list={state.teacherList}
          headingArray={state.headingArray}
          uniqueTrait='email'
          linkKey={'teacherName'}
          link={{
            to: '/teachers/details',
          }}
          renderActions={(email) => {
            return (
              <>
                <Button onClick={() => onDeleteHandler(email)} variant='danger'>
                  Remove
                </Button>
              </>
            );
          }}
        />
      </div>
      <AppModal
        heading={'Add new Teacher'}
        show={showAddTeacher}
        onHide={() => setShowAddTeacher(false)}
      >
        <AddTeacherForm
          onAdd={(teacherList) => {
            setState({
              ...state,
              teacherList: teacherList,
              allTeacher: teacherList,
            });
            setShowAddTeacher(false);
          }}
        />
      </AppModal>
    </div>
  );
};

export default TeacherList;
