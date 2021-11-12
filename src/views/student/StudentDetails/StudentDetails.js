import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getStudentByRollNo } from '../../../api/fakeapi';
import StudendDetailsReport from '../../../components/student/StudentDetailsReport/StudentDetailsReport';

export default function StudentDetails() {
  const { rollNo } = useParams();

  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rollNo) {
      setLoading(true);
      getStudentByRollNo(rollNo)
        .then((student) => {
          setStudent(student);
          setLoading(false);
        })
        .catch((err) => {
          console.log('get student by roll no', rollNo);
          setLoading(false);
        });
    }
  }, [rollNo]);

  return (
    <div>
      <StudendDetailsReport loading={loading} student={student} />
    </div>
  );
}
