import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getTeacherByEmail } from '../../../api/fakeapi';
import TeacherDetailsReport from '../../../components/teacher/TeacherDetails/TeacherDetails';

export default function TeacherDetails() {
  const { email } = useParams();

  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      setLoading(true);
      getTeacherByEmail(email)
        .then((teacher) => {
          setTeacher(teacher);
          setLoading(false);
        })
        .catch((err) => {
          console.log('get teacher by email', email);
          setLoading(false);
        });
    }
  }, [email]);

  return (
    <div>
      <TeacherDetailsReport loading={loading} teacher={teacher} />
    </div>
  );
}
