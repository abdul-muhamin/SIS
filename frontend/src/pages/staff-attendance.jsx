import { Helmet } from 'react-helmet-async';

import  UserView  from 'src/sections/staff-attendance/staff-attendance';

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
