import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/admin-staff-attendence/view/index';

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