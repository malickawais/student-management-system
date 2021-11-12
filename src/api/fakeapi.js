const studentsList = [
  {
    name: 'Salman',
    fatherName: 'Shoaib',
    section: 1,
    phone: '03462870231',
    rollNo: 505,
  },
  {
    name: 'Awais',
    fatherName: 'Abdul Rehman',
    section: 1,
    phone: '03082392930',
    rollNo: 506,
  },
  {
    name: 'Ashraf',
    fatherName: 'Abdul Rehman',
    section: 1,
    phone: '03007022497',
    rollNo: 507,
  },
  {
    name: 'Ashraf',
    fatherName: 'Abdul Rehman',
    section: 3,
    phone: '03007022497',
    rollNo: 511,
  },
  {
    name: 'Asifa',
    fatherName: 'Abdul Rehman',
    section: 2,
    phone: '03007022497',
    rollNo: 510,
  },
  {
    name: 'Abida',
    fatherName: 'Abdul Rehman',
    section: 3,
    phone: '03007022497',
    rollNo: 509,
  },
  {
    name: 'Minahil',
    fatherName: 'Shoaib',
    section: 2,
    phone: '03007022497',
    rollNo: 508,
  },
];

export const getStudents = (students) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (students?.length > 0) {
        resolve(students);
      } else {
        resolve(studentsList);
      }
    }, 2000);
  });
};

export const getStudentByRollNo = (rollNo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(studentsList.find((student) => student.rollNo == rollNo));
    }, 2000);
  });
};

export const addStudent = async (student) => {
  return await getStudents([...studentsList, student], 2000);
};

const teacherList = [
  {
    teacherName: 'Dr Naveed',
    subject: 'Soil Mechanics',
    lectureDay: 'Tuesday , Wednesday',
    designation: 'Associate Professor',
    email: 'naveed1@gmail.com',
  },

  {
    teacherName: 'Dr Faisal',
    subject: 'Structural Engineering',
    lectureDay: 'Tuesday , Friday',
    designation: 'Assistant Professor',
    email: 'faisal2@gmail.com',
  },
  {
    teacherName: 'Dr Jawad',
    subject: 'Water Resources',
    lectureDay: 'Monday , Wednesday',
    designation: 'Professor',
    email: 'jawad3@gmail.com',
  },
  {
    teacherName: 'Dr Minahil',
    subject: 'Soil Mechanics',
    lectureDay: 'Tuesday , Wednesday',
    designation: 'HOD',
    email: 'minahil1@gmail.com',
  },
  {
    teacherName: 'kamran',
    subject: 'Soil Mechanics',
    lectureDay: 'Tuesday , Wednesday',
    designation: 'Lecturer',
    email: 'kamran1@gmail.com',
  },
  {
    teacherName: 'Hammad',
    subject: 'Soil Mechanics',
    lectureDay: 'Tuesday , Wednesday',
    designation: 'Lab Supervisor',
    email: 'hammad1@gmail.com',
  },
];

export const getTeachers = (teachers) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (teachers?.length > 0) {
        resolve(teachers);
      } else {
        resolve(teacherList);
      }
    }, 2000);
  });
};
export const getTeacherByEmail = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(teacherList.find((teacher) => teacher.email == email));
    }, 2000);
  });
};

export const addTeacher = async (teacher) => {
  return await getTeachers([...teacherList, teacher], 2000);
};

const users = [
  {
    username: 'msalman',
    password: 'abc1234@',
    role: 'teacher',
  },
  {
    username: 'awais',
    password: 'abc1234@',
    role: 'teacher',
  },
];

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        ...users.find(
          (user) => user.username === username && user.password === password
        ),
        token: 'faketoken:::',
      });
    }, 2000);
  });
}
