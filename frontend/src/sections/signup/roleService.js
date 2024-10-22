import { doc, setDoc } from 'firebase/firestore';

import { db } from 'src/firebase'; // Import Firestore instance

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
