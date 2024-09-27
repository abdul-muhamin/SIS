import { Helmet } from 'react-helmet-async';

import StudentView from 'src/sections/add-student-section/StudentView';



// ----------------------------------------------------------------------

export default function StudentPage() {
  return (
    <>
      <Helmet>
        <title> Add Student </title>
      </Helmet>

      <StudentView />
    </>
  );
}
