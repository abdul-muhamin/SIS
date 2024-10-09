// import AssignmentUserView from "src/sections/assignment/assignmentUser";

// import AddAssignmentView from 'src/sections/assignment/addAssignmentView';

import { AssignmentPage } from 'src/sections/assignment/view/index';

import { Helmet } from 'react-helmet-async';




// ----------------------------------------------------------------------

export default function AddAssignmentUserPage() {
  return (
    <>
      <Helmet>
        <title>Assignment | Minimal UI</title>
      </Helmet>

      <AssignmentPage />
    </>
  );
}
