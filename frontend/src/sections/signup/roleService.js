// import { doc, setDoc } from 'firebase/firestore';

// import { db } from 'src/firebase'; // Import Firestore instance

// const roles = [
//   { id: '121', Name: 'STUDENT' },
//   { id: '121', Name: 'STAFF' },
//   { id: '121', Name: 'ADMIN' },
//   { id: '121', Name: 'SUPER-ADMIN' },
// ];

// export const createRoleswithPolicies = async () => {
//   try {
//   /////////////////   STAFF
//     const uuidForRole= '1'
//   const rolepoliciesStaff = [
//     { id: '121', URL:'/staff-dashboard', roleId: uuidForRole },
//     { id: '121', URL:'/staff-attendance', roleId: uuidForRole },
//     { id: '121', URL:'/staff-attendance-report', roleId: uuidForRole },
//     { id: '121', URL:'/assignment-report', roleId: uuidForRole },
//     ];
//     setDoc(doc(db, 'roles', roleName), {
//       uuidForRole,
//        'STAFF' 
//     });   
//     rolepoliciesStaff.forEach((element) => {
//       setDoc(doc(db, 'rolespolicy', element), {
//         //  element.id,
//         //element.idName,
//       });
//     });
 
//   /////////////////   STUDENT 
//  uuidForRole= '1' // new UUID
//    const rolepoliciesStudent = [
//     { id: '121', URL:'/student-dashboard', roleId: uuidForRole },
//     { id: '121', URL:'/student-attendance', roleId: uuidForRole },
//     { id: '121', URL:'/student-attendance-report', roleId: uuidForRole },
//     { id: '121', URL:'/student-report', roleId: uuidForRole },
//   ];  setDoc(doc(db, 'roles', roleName), {
//       uuidForRole,
//        'STAFF' 
//     });   
//     rolepoliciesStudent.forEach((element) => {
//       setDoc(doc(db, 'rolespolicy', element), {
//         //  element.id,
//         //element.idName,
//       });
//     });


//   } catch (error) {
//     console.error('Error creating role: ', error);
//   }
// };
// export const createRole = async (roleId, roleName) => {
//   try {
//     await setDoc(doc(db, 'roles', roleId), {
//       roleId,
//       roleName,
//     });
//   } catch (error) {
//     console.error('Error creating role: ', error);
//   }
// };

import { v4 as uuidv4 } from 'uuid'; 
import { doc, setDoc } from 'firebase/firestore';

import { db } from 'src/firebase'; // Import Firestore instance

const roles = [
  { id: '121', name: 'STUDENT' },
  { id: '122', name: 'STAFF' },
  { id: '123', name: 'ADMIN' },
  { id: '124', name: 'SUPER-ADMIN' },
];

export const createRolesWithPolicies = async () => {
  try {
    // STAFF Role
    const uuidForStaffRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesStaff = [
      { id: uuidv4(), URL: '/staff-dashboard', roleId: uuidForStaffRole },
      { id: uuidv4(), URL: '/staff-attendance', roleId: uuidForStaffRole },
      { id: uuidv4(), URL: '/staff-attendance-report', roleId: uuidForStaffRole },
      { id: uuidv4(), URL: '/assignment-report', roleId: uuidForStaffRole },
    ];

    // Create STAFF role
    await setDoc(doc(db, 'roles', uuidForStaffRole), {
      roleId: uuidForStaffRole,
      roleName: 'STAFF',
    });

    // Create STAFF role policies
    await Promise.all(
      rolePoliciesStaff.map(async (policy) => {
        await setDoc(doc(db, 'rolespolicies', policy.id), {
          roleId: policy.roleId,
          URL: policy.URL,
        });
      })
    );

    // STUDENT Role
    const uuidForStudentRole = uuidv4(); // Use a new UUID for STUDENT role
    const rolePoliciesStudent = [
      { id: uuidv4(), URL: '/student-dashboard', roleId: uuidForStudentRole },
      { id: uuidv4(), URL: '/student-attendance', roleId: uuidForStudentRole },
      { id: uuidv4(), URL: '/student-attendance-report', roleId: uuidForStudentRole },
      { id: uuidv4(), URL: '/student-report', roleId: uuidForStudentRole },
    ];

    // Create STUDENT role
    await setDoc(doc(db, 'roles', uuidForStudentRole), {
      roleId: uuidForStudentRole,
      roleName: 'STUDENT',
    });

    // Create STUDENT role policies
    await Promise.all(
      rolePoliciesStudent.map(async (policy) => {
        await setDoc(doc(db, 'rolespolicies', policy.id), {
          roleId: policy.roleId,
          URL: policy.URL,
        });
      })
    );

  } catch (error) {
    console.error('Error creating roles and policies: ', error);
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
