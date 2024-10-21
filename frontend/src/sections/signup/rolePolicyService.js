import { doc, setDoc } from 'firebase/firestore';

import { db } from 'src/firebase';

export const createRolePolicy = async (policyId, roleId, apiUrl) => {
  try {
    await setDoc(doc(db, 'rolePolicie', policyId), {
      policyId,
      roleId,
      apiUrl,
    });
  } catch (error) {
    console.error('Error creating role policy: ', error);
  }
};
