import { doc, setDoc } from 'firebase/firestore';

import { db } from 'src/firebase'; // Import Firestore instance

const roles = [
  { id: '121', Name: 'STUDENT' },
  { id: '121', Name: 'STAFF' },
  { id: '121', Name: 'ADMIN' },
  { id: '121', Name: 'SUPER-ADMIN' },
];

export const createRoleswithPolicies = async () => {
  try {
  /////////////////   STAFF
    const uuidForRole= '1'
  const rolepoliciesStaff = [
    { id: '121', URL:'/staff-dashboard', roleId: uuidForRole },
    { id: '121', URL:'/staff-attendance', roleId: uuidForRole },
    { id: '121', URL:'/staff-attendance-report', roleId: uuidForRole },
    { id: '121', URL:'/assignment-report', roleId: uuidForRole },
    ];
    setDoc(doc(db, 'roles', roleName), {
      uuidForRole,
       'STAFF' 
    });   
    rolepoliciesStaff.forEach((element) => {
      setDoc(doc(db, 'rolespolicy', element), {
        //  element.id,
        //element.idName,
      });
    });
 
  /////////////////   STUDENT 
 uuidForRole= '1' // new UUID
   const rolepoliciesStudent = [
    { id: '121', URL:'/student-dashboard', roleId: uuidForRole },
    { id: '121', URL:'/student-attendance', roleId: uuidForRole },
    { id: '121', URL:'/student-attendance-report', roleId: uuidForRole },
    { id: '121', URL:'/student-report', roleId: uuidForRole },
  ];  setDoc(doc(db, 'roles', roleName), {
      uuidForRole,
       'STAFF' 
    });   
    rolepoliciesStudent.forEach((element) => {
      setDoc(doc(db, 'rolespolicy', element), {
        //  element.id,
        //element.idName,
      });
    });


  } catch (error) {
    console.error('Error creating role: ', error);
  }
};
export const createRole = async (roleId, roleName) => {
  try {
    await setDoc(doc(db, 'roles', roleId), {
      roleId,
      roleName,
    });
  } catch (error) {
    console.error('Error creating role: ', error);
  }
};
