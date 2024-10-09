// import GradeTable from "src/sections/grade/gradeView";
import { GradeView } from 'src/sections/grade/view/index';
import { Helmet } from 'react-helmet-async';

// import AddAssignmentView from 'src/sections/assignment/addAssignmentView';







// ----------------------------------------------------------------------

export default function gradePage() {
  return (
    <>
      <Helmet>
        <title>Grade | Minimal UI </title>
      </Helmet>

      <GradeView />
    </>
  );
}
