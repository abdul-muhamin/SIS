import { doc, setDoc } from 'firebase/firestore';

import { db } from 'src/firebase';

export const createUserPolicy = async (userPolicyId, rolepolicyId, userId) => {
  try {
    await setDoc(doc(db, 'userPolicies', userPolicyId), {
      userPolicyId,
      rolepolicyId,
      userId,
    });
  } catch (error) {
    console.error('Error creating user policy: ', error);
  }
};
