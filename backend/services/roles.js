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
      { id: uuidv4(), URL: '/staff-dashboard', roleId: uuidForStaffRole, order: 1, URL_Name: 'Staff Dashboard', URL_Desc: '' },
      { id: uuidv4(), URL: '/staff-attendance', roleId: uuidForStaffRole, order: 2, URL_Name: 'Staff Attendance', URL_Desc: '' },
      { id: uuidv4(), URL: '/staff-attendance-report', roleId: uuidForStaffRole, order: 3, URL_Name: 'Staff Attendance Report', URL_Desc: '' },
      { id: uuidv4(), URL: '/assignment-report', roleId: uuidForStaffRole, order: 4, URL_Name: 'Assignment Report', URL_Desc: '' },
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
          order: policy.order,
          URL_Name: policy.URL_Name,
          URL_Desc: policy.URL_Desc,
        });
      })
    );

    // SUPER ADMIN Role
    const uuidForSuperAdminRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesSuperAdmin = [
      { id: uuidv4(), URL: '/super-admin-dashboard', roleId: uuidForSuperAdminRole, order: 1, URL_Name: 'Super Admin Dashboard', URL_Desc: '' },
      { id: uuidv4(), URL: '/admin-dashboard', roleId: uuidForSuperAdminRole, order: 2, URL_Name: 'Admin Dashboard', URL_Desc: '' },
      { id: uuidv4(), URL: '/staff-dashboard', roleId: uuidForSuperAdminRole, order: 3, URL_Name: 'Staff Dashboard', URL_Desc: '' },
      { id: uuidv4(), URL: '/student-dashboard', roleId: uuidForSuperAdminRole, order: 4, URL_Name: 'Student Dashboard', URL_Desc: '' },
      { id: uuidv4(), URL: '/student', roleId: uuidForSuperAdminRole, order: 8, URL_Name: 'Student', URL_Desc: '' },
      { id: uuidv4(), URL: '/grade', roleId: uuidForSuperAdminRole, order: 13, URL_Name: 'Grade', URL_Desc: '' },
      { id: uuidv4(), URL: '/staff', roleId: uuidForSuperAdminRole, order: 5, URL_Name: 'Staff', URL_Desc: '' },
      { id: uuidv4(), URL: '/assignment', roleId: uuidForSuperAdminRole, order: 11, URL_Name: 'Assignment', URL_Desc: '' },
      { id: uuidv4(), URL: '/student-attendance', roleId: uuidForSuperAdminRole, order: 9, URL_Name: 'Student Attendance', URL_Desc: '' },
      { id: uuidv4(), URL: '/staff-attendance', roleId: uuidForSuperAdminRole, order: 6, URL_Name: 'Staff Attendance', URL_Desc: '' },
      { id: uuidv4(), URL: '/student-attendance-report', roleId: uuidForSuperAdminRole, order: 10, URL_Name: 'Student Attendance Report', URL_Desc: '' },
      { id: uuidv4(), URL: '/assignment-report', roleId: uuidForSuperAdminRole, order: 12, URL_Name: 'Assignment Report', URL_Desc: '' },
      { id: uuidv4(), URL: '/staff-attendance-report', roleId: uuidForSuperAdminRole, order: 7, URL_Name: 'Staff Attendance Report', URL_Desc: '' },
    ];

    // Create SUPER ADMIN role
    await setDoc(doc(db, 'roles', uuidForSuperAdminRole), {
      roleId: uuidForSuperAdminRole,
      roleName: 'SUPER_ADMIN',
    });

    // Create SUPER ADMIN role policies
    await Promise.all(
      rolePoliciesSuperAdmin.map(async (policy) => {
        await setDoc(doc(db, 'rolespolicies', policy.id), {
          roleId: policy.roleId,
          URL: policy.URL,
          order: policy.order,
          URL_Name: policy.URL_Name,
          URL_Desc: policy.URL_Desc,
        });
      })
    );

    // ADMIN Role
    const uuidForAdminRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesAdmin = [
      { id: uuidv4(), URL: '/admin-dashboard', roleId: uuidForAdminRole, order: 1, URL_Name: 'Admin Dashboard', URL_Desc: '' },
      { id: uuidv4(), URL: '/student', roleId: uuidForAdminRole, order: 3, URL_Name: 'Student', URL_Desc: '' },
      { id: uuidv4(), URL: '/grade', roleId: uuidForAdminRole, order: 5, URL_Name: 'Grade', URL_Desc: '' },
      { id: uuidv4(), URL: '/staff', roleId: uuidForAdminRole, order: 2, URL_Name: 'Staff', URL_Desc: '' },
      { id: uuidv4(), URL: '/assignment', roleId: uuidForAdminRole, order: 4, URL_Name: 'Assignment', URL_Desc: '' },
    ];

    // Create ADMIN role
    await setDoc(doc(db, 'roles', uuidForAdminRole), {
      roleId: uuidForAdminRole,
      roleName: 'ADMIN',
    });

    // Create ADMIN role policies
    await Promise.all(
      rolePoliciesAdmin.map(async (policy) => {
        await setDoc(doc(db, 'rolespolicies', policy.id), {
          roleId: policy.roleId,
          URL: policy.URL,
          order: policy.order,
          URL_Name: policy.URL_Name,
          URL_Desc: policy.URL_Desc,
        });
      })
    );

    // STUDENT Role
    const uuidForStudentRole = uuidv4(); // Use a new UUID for STUDENT role
    const rolePoliciesStudent = [
      { id: uuidv4(), URL: '/student-dashboard', roleId: uuidForStudentRole, order: 1, URL_Name: 'Student Dashboard', URL_Desc: '' },
      { id: uuidv4(), URL: '/student-attendance', roleId: uuidForStudentRole, order: 2, URL_Name: 'Student Attendance', URL_Desc: '' },
      { id: uuidv4(), URL: '/student-attendance-report', roleId: uuidForStudentRole, order: 3, URL_Name: 'Student Attendance Report', URL_Desc: '' },
      { id: uuidv4(), URL: '/student-report', roleId: uuidForStudentRole, order: 4, URL_Name: 'Student Report', URL_Desc: '' },
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
          order: policy.order,
          URL_Name: policy.URL_Name,
          URL_Desc: policy.URL_Desc,
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
