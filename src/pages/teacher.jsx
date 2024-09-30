import { Helmet } from 'react-helmet-async';

import  Teacher  from 'src/sections/teacher/view/user-view';


// import { ProductsView } from 'src/sections/products/view';
// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Teacher </title>
      </Helmet>

      <Teacher />
    </>
  );
}
