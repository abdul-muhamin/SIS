import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/student-attendence/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> attendence | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}