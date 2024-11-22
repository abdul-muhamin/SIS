const { doc, setDoc } = require('firebase/firestore');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../firebase'); // Import Firestore instance



const createRolesWithPolicies = async () => {
  try {
    debugger
    // STAFF Role
    const uuidForStaffRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesStaff = [
      { id: uuidv4(), URL: '/dashboard', roleId: uuidForStaffRole, order: 1, URL_Name: 'Dashboard', Icon: '' , isActive : true },
      { id: uuidv4(), URL: '/staff-attendance', roleId: uuidForStaffRole, order: 2, URL_Name: 'Attendance', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/staff-attendance-report', roleId: uuidForStaffRole, order: 3, URL_Name: 'Attendance Report', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/assignment-report', roleId: uuidForStaffRole, order: 4, URL_Name: 'Assignment Report', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/schedule', roleId: uuidForStaffRole, order: 5, URL_Name: 'Manage Schedule', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/virtual-classroom', roleId: uuidForStaffRole, order: 6, URL_Name: 'Virtual ClassRoom', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/chatbot', roleId: uuidForStaffRole, order: 7, URL_Name: 'ChatBot', Icon: '', isActive : true },
      
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
          rolePolicyId:policy.id,
          URL: policy.URL,
          order: policy.order,
          URL_Name: policy.URL_Name,
          Icon: policy.Icon,
          isActive:policy.isActive
        });
      })
    );

    // SUPER ADMIN Role
    const uuidForSuperAdminRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesSuperAdmin = [
      { id: uuidv4(), URL: '/dashboard', roleId: uuidForSuperAdminRole, order: 1, URL_Name: 'Dashboard', Icon: '/assets/icons/navbar/ic_dashboard.svg' , isActive : true},
      { id: uuidv4(), URL: '/staff', roleId: uuidForSuperAdminRole, order: 2, URL_Name: 'Staff', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/manage-staff-attendance', roleId: uuidForSuperAdminRole, order: 3, URL_Name: 'Staff Attendance', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/staff-attendance-report', roleId: uuidForSuperAdminRole, order: 4, URL_Name: 'Staff Attendance Report', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/student', roleId: uuidForSuperAdminRole, order: 5, URL_Name: 'Student', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/manage-student-attendance', roleId: uuidForSuperAdminRole, order: 6, URL_Name: 'Student Attendance', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/student-attendance-report', roleId: uuidForSuperAdminRole, order: 7, URL_Name: 'Student Attendance Report', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/assignment', roleId: uuidForSuperAdminRole, order: 8, URL_Name: 'Assignment', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/assignment-report', roleId: uuidForSuperAdminRole, order: 9, URL_Name: 'Assignment Report', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/grade', roleId: uuidForSuperAdminRole, order: 10, URL_Name: 'Grade', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/schedule', roleId: uuidForSuperAdminRole, order: 11, URL_Name: 'Manage Schedule', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/virtual-classroom', roleId: uuidForSuperAdminRole, order: 12, URL_Name: 'Virtual ClassRoom', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/chatbot', roleId: uuidForSuperAdminRole, order: 13, URL_Name: 'ChatBot', Icon: '', isActive : true },
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
          rolePolicyId:policy.id,
          URL: policy.URL,
          order: policy.order,
          URL_Name: policy.URL_Name,
          Icon: policy.Icon,
          isActive:policy.isActive
        });
      })
    );

    // ADMIN Role
    const uuidForAdminRole = uuidv4(); // Use a unique UUID for the role
    const rolePoliciesAdmin = [
      { id: uuidv4(), URL: '/dashboard', roleId: uuidForAdminRole, order: 1, URL_Name: 'Dashboard', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/staff', roleId: uuidForAdminRole, order: 2, URL_Name: 'Staff', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/student', roleId: uuidForAdminRole, order: 3, URL_Name: 'Student', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/assignment', roleId: uuidForAdminRole, order: 4, URL_Name: 'Assignment', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/grade', roleId: uuidForAdminRole, order: 5, URL_Name: 'Grade', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/schedule', roleId: uuidForAdminRole, order: 6, URL_Name: 'Manage Schedule', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/virtual-classroom', roleId: uuidForAdminRole, order: 7, URL_Name: 'Virtual ClassRoom', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/chatbot', roleId: uuidForAdminRole, order: 8, URL_Name: 'ChatBot', Icon: '', isActive : true },
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
          rolePolicyId:policy.id,
          URL: policy.URL,
          order: policy.order,
          URL_Name: policy.URL_Name,
          Icon: policy.Icon,
          isActive:policy.isActive
        });
      })
    );

    // STUDENT Role
    const uuidForStudentRole = uuidv4(); // Use a new UUID for STUDENT role
    const rolePoliciesStudent = [
      { id: uuidv4(), URL: '/dashboard', roleId: uuidForStudentRole, order: 1, URL_Name: 'Dashboard', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/student-attendance', roleId: uuidForStudentRole, order: 2, URL_Name: 'Attendance', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/student-attendance-report', roleId: uuidForStudentRole, order: 3, URL_Name: 'Attendance Report', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/student-report', roleId: uuidForStudentRole, order: 4, URL_Name: 'Student Report', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/schedule', roleId: uuidForStudentRole, order: 5, URL_Name: 'Manage Schedule', Icon: '', isActive : true },
      { id: uuidv4(), URL: '/virtual-classroom', roleId: uuidForStudentRole, order: 6, URL_Name: 'Virtual ClassRoom', Icon: '' , isActive : true},
      { id: uuidv4(), URL: '/chatbot', roleId: uuidForStudentRole, order: 7, URL_Name: 'ChatBot', Icon: '', isActive : true },
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
          rolePolicyId:policy.id,
          URL: policy.URL,
          order: policy.order,
          URL_Name: policy.URL_Name,
          Icon: policy.Icon,
          isActive:policy.isActive
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
