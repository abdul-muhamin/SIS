import { Helmet } from 'react-helmet-async';

import  UserView  from 'src/sections/super-admin-dashboard/superAdminDashboard';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Student | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}
