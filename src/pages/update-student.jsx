import { Helmet } from 'react-helmet-async';

import UpdateStudentView from 'src/sections/update-student-section/UpdateStudentView';





// ----------------------------------------------------------------------

export default function UpdateStudentPage() {
  return (
    <>
      <Helmet>
        <title> Update and View </title>
      </Helmet>

      <UpdateStudentView />
    </>
  );
}
