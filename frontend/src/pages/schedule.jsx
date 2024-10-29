import { Helmet } from 'react-helmet-async';

import  ScheduleView  from 'src/sections/schedule/index';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Schedule | Minimal UI </title>
      </Helmet>

      <ScheduleView />
    </>
  );
}
