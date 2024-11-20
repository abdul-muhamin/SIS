import { Helmet } from 'react-helmet-async';

import  UserCall  from 'src/sections/userCall/userCall';


// import { ProductsView } from 'src/sections/products/view';
// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Call | Minimal UI</title>
      </Helmet>

      <UserCall />
    </>
  );
}
