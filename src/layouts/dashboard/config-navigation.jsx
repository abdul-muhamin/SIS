import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'student',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'teacher',
    path: '/student',
    icon: icon('ic_user'),
  },
  {
    title: 'Grade',
    path: '/update-student',
    icon: icon('ic_user'),
  },
  {
    title: 'Assignment',
    path: '/add-assignment',
    icon: icon('ic_user'),
  },
  {
    title: 'Admin',
    path: '/assignment-user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'admin panel',
  //   path: '/admin-panel',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'login',
    path: '/',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
