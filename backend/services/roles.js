const { doc, setDoc } = require('firebase/firestore');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../firebase'); // Import Firestore instance

const roles = [
  { id: '121', name: 'STUDENT' },
  { id: '122', name: 'STAFF' },
  { id: '123', name: 'ADMIN' },
  { id: '124', name: 'SUPER-ADMIN' },
];

const createRolesWithPolicies = async () => {
  try {
    // STAFF Role
    const uuidForStaffRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesStaff = [
      { id: uuidv4(), URL: '/staff-dashboard', roleId: uuidForStaffRole },
      { id: uuidv4(), URL: '/staff-attendance', roleId: uuidForStaffRole },
      { id: uuidv4(), URL: '/staff-attendance-report', roleId: uuidForStaffRole },
      { id: uuidv4(), URL: '/assignment-report', roleId: uuidForStaffRole },
    ];

    // // Create STAFF role
    await setDoc(doc(db, 'roles', uuidForStaffRole), {
      roleId: uuidForStaffRole,
      roleName: 'STAFF',
    });

    // // Create STAFF role policies
    await Promise.all(
      rolePoliciesStaff.map(async (policy) => {
        await setDoc(doc(db, 'rolespolicies', policy.id), {
          roleId: policy.roleId,
          URL: policy.URL,
        });
      })
    );


    // super admin
    const uuidForSuperAdminRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesSuperAdmin = [
      { id: uuidv4(), URL: '/super-admin-dashboard', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/admin-dashboard', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/staff-dashboard', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/student-dashboard', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/student', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/grade', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/staff', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/assignment', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/student-attendence', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/staff-attendence', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/student-attendence-report', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/assignment-report', roleId: uuidForSuperAdminRole },
      { id: uuidv4(), URL: '/staff-attendence-report', roleId: uuidForSuperAdminRole },
    ];

    // Create SUPER ADMIN role
    await setDoc(doc(db, 'roles', uuidForSuperAdminRole), {
      roleId: uuidForSuperAdminRole,
      roleName: 'SUPER_ADMIN',
    });

  // //   // Create SUPER ADIMN role policies
    await Promise.all(
      rolePoliciesSuperAdmin.map(async (policy) => {
        await setDoc(doc(db, 'rolespolicies', policy.id), {
          roleId: policy.roleId,
          URL: policy.URL,
        });
      })
    );

  //   // ADMIN
    const uuidForAdminRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesAdmin = [
      { id: uuidv4(), URL: '/admin-dashboard', roleId: uuidForAdminRole },
      { id: uuidv4(), URL: '/student', roleId: uuidForAdminRole },
      { id: uuidv4(), URL: '/grade', roleId: uuidForAdminRole },
      { id: uuidv4(), URL: '/staff', roleId: uuidForAdminRole },
      { id: uuidv4(), URL: '/assignment', roleId: uuidForAdminRole },
    ];

  //   // Create ADMIN role
    await setDoc(doc(db, 'roles', uuidForAdminRole), {
      roleId: uuidForAdminRole,
      roleName: 'ADMIN',
    });

  //   // Create ADIMN role policies
    await Promise.all(
      rolePoliciesAdmin.map(async (policy) => {
        await setDoc(doc(db, 'rolespolicies', policy.id), {
          roleId: policy.roleId,
          URL: policy.URL,
        });
      })
    );

  //   // STUDENT Role
    const uuidForStudentRole = uuidv4(); // Use a new UUID for STUDENT role
    const rolePoliciesStudent = [
      { id: uuidv4(), URL: '/student-dashboard', roleId: uuidForStudentRole },
      { id: uuidv4(), URL: '/student-attendance', roleId: uuidForStudentRole },
      { id: uuidv4(), URL: '/student-attendance-report', roleId: uuidForStudentRole },
      { id: uuidv4(), URL: '/student-report', roleId: uuidForStudentRole },
    ];

  //   // Create STUDENT role
    await setDoc(doc(db, 'roles', uuidForStudentRole), {
      roleId: uuidForStudentRole,
      roleName: 'STUDENT',
    },
  );

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

// Change this line to use CommonJS export
module.exports = {
  createRolesWithPolicies,
  createRole: async (roleId, roleName) => {
    try {
      await setDoc(doc(db, 'roles', roleId), {
        roleId,
        roleName,
      });
    } catch (error) {
      console.error('Error creating role: ', error);
    }
  },
};
