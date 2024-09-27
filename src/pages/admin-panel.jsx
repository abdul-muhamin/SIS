import { Helmet } from 'react-helmet-async';

import AdminView from 'src/sections/admin/adminView';





// ----------------------------------------------------------------------

export default function StudentPage() {
  return (
    <>
      <Helmet>
        <title> Admin Panel </title>
      </Helmet>

      <AdminView />
    </>
  );
}
