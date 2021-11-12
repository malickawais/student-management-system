import React, { useEffect, useState } from 'react';
import Customtable from '../../../components/common/customTable';
import { getStudents } from '../../../api/fakeapi';
import { Button, FormControl, Form, Row, Col, Badge } from 'react-bootstrap';
import './studentList.css';
import AppModal from '../../../components/common/Modal/Modal';
import AddStudentForm from '../../../components/student/AddStudentForm/AddStudentForm';

const StudentList = () => {
  const [showAddStudent, setShowAddStudent] = useState(false);

  const [attendence, setAttendence] = useState({});

  const [state, setState] = useState({
    studentList: [],
    allStudents: [],
    studentLoading: false,
    headingArray: [
      'Student Name',
      'Father Name',
      'Section',
      'Phone Number',
      'Roll Number',
    ],
  });

  useEffect(() => {
    console.log('componentDidMount called');
    setState({ ...state, studentLoading: true });

    getStudents().then((stdList) => {
      setState({
        ...state,
        studentLoading: false,
        studentList: stdList,
        allStudents: stdList,
        showAttendance: false,
      });
      // ** first we create empty object then we filter each studernt on the base of roll number and store it in attendanceObj
      const attendenceObj = {};
      stdList.forEach((std) => {
        attendenceObj[std.rollNo] = '';
      });
      console.log(attendenceObj);
      setAttendence(attendenceObj);
    });
  }, []);

  const onDeleteHandler = (rollNo) => {
    let reformedStudentList = [...state.studentList];
    reformedStudentList = reformedStudentList.filter((student) => {
      return student.rollNo != rollNo;
    });
    setState({ ...state, studentList: reformedStudentList });
  };
  const getMaximumRollNo = () => {
    let maximum = 0;

    for (let i = 0; i < state.studentList.length; i++) {
      const student = state.studentList[i];
      if (student.rollNo > maximum) {
        maximum = student.rollNo;
      }
    }
    return maximum;
  };
  const addNewStudent = () => {
    let maximumRollNumber = getMaximumRollNo();
    let newStudentRollNo = maximumRollNumber + 1;
    let newStudentList = [...state.studentList];
    newStudentList.push({
      name: 'Umer',
      fatherName: 'Akram',
      section: '2',
      phone: '03224563212',
      rollNo: newStudentRollNo,
    });
    setState({ ...state, studentList: newStudentList });
  };
  const onChangeHandler = (e) => {
    const query = e.target.value;

    if (!e.target.value) {
      setState({ ...state, studentList: state.allStudents });
      return;
    }

    let filteredStdList = [...state.allStudents];
    filteredStdList = filteredStdList.filter(
      (student) =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.phone.includes(query.toLowerCase())
    );

    setState({ ...state, studentList: filteredStdList });
  };

  const onResetHandler = () => {
    setState({ ...state, studentList: state.allStudents });
  };

  const onSectionChange = (e) => {
    if (!e.target.value) {
      setState({ ...state, studentList: state.allStudents });
      return;
    }
    let filteredStdList = [...state.allStudents];
    filteredStdList = filteredStdList.filter(
      (student) => student.section == e.target.value
    );

    setState({ ...state, studentList: filteredStdList });
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
            onClick={() => setShowAddStudent(true)}
          >
            Add New Student
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
              onChange={onSectionChange}
              className='ss-section-select'
            >
              <option value=''>Select The Section </option>
              <option value={1}> Section 1</option>
              <option value={2}> Section 2</option>
              <option value={3}> Section 3</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
      <div>
        <Customtable
          headingArray={state.headingArray}
          list={state.studentList}
          linkKey={'name'}
          link={{
            to: '/students/details',
          }}
          uniqueTrait='rollNo'
          onDeleteHandler={onDeleteHandler}
          addNewStudent={addNewStudent}
          renderActions={(rollNo) => {
            return (
              <>
                {/* <ButtonGroup aria-label='Basic example'> */}
                {/* if one has already marked attendence then it will show as present or absent otherwise button will be shown */}
                {attendence[rollNo] === 'present' ? (
                  <Badge bg='success' text='light'>
                    Present
                  </Badge>
                ) : (
                  <Button
                    className='mx-2'
                    onClick={() => {
                      setAttendence({
                        ...attendence,
                        // there we do not want to change the whole attendance list that was in attendanceObj we only want to change that is clicked
                        [rollNo]: 'present',
                      });
                    }}
                    variant='primary'
                  >
                    Present
                  </Button>
                )}
                {attendence[rollNo] === 'absent' ? (
                  <Badge bg='warning' text='dark'>
                    Absent
                  </Badge>
                ) : (
                  <Button
                    className='mx-2'
                    onClick={() => {
                      setAttendence({
                        ...attendence,
                        [rollNo]: 'absent',
                      });
                    }}
                    variant='secondary'
                  >
                    Absent
                  </Button>
                )}
                {/* </ButtonGroup> */}
              </>
            );
          }}
        />
      </div>
      <AppModal
        heading={'Add new student'}
        show={showAddStudent}
        onHide={() => setShowAddStudent(false)}
      >
        <AddStudentForm
          onAdd={(studentList) => {
            setState({
              ...state,
              studentList: studentList,
              allStudents: studentList,
            });
            setShowAddStudent(false);
          }}
        />
      </AppModal>
    </div>
  );
};

export default StudentList;
