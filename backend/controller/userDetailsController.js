const db = require('../config/firebaseConfig');

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user details
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userData = userDoc.data();
    const roleName = userData.role;  // Fetch role name from user collection

    // Fetch role details based on roleName
    const roleSnapshot = await db.collection('role')
      .where('roleName', '==', roleName)
      .get();
    if (roleSnapshot.empty) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Assuming one role for simplicity
    const roleDoc = roleSnapshot.docs[0];
    const roleData = roleDoc.data();
    const roleId = roleData.roleId;  // Get roleId from role collection

    // Fetch user-specific policies
    const userPoliciesSnapshot = await db.collection('userPolicie')
      .where('userId', '==', userId)
      .get();
    const userPolicies = userPoliciesSnapshot.docs.map(doc => doc.data().policyId);

    // Fetch role-specific policies
    const rolePoliciesSnapshot = await db.collection('rolePolicie')
      .where('roleId', '==', roleId)
      .get();
    const rolePolicies = rolePoliciesSnapshot.docs.map(doc => ({
      policyId: doc.data().policyId,
      apiUrl: doc.data().apiUrl
    }));

    // Combine user policies and role policies
    const allPolicyIds = [...new Set([...userPolicies, ...rolePolicies.map(rp => rp.policyId)])];

    // Fetch details of each policy
    const policiesData = [];
    for (const policyId of allPolicyIds) {
      const policyDoc = await db.collection('policie').doc(policyId).get();
      if (policyDoc.exists) {
        const policyData = policyDoc.data();
        policiesData.push({
          policyId: policyDoc.id,
          apiUrl: policyData.apiUrl || rolePolicies.find(rp => rp.policyId === policyDoc.id)?.apiUrl,
          policyName: policyData.policyName,
        });
      }
    }

    // Prepare the response
    const response = {
      userId: userDoc.id,
      email: userData.email,
      role: {
        roleId: roleDoc.id,
        roleName: roleData.roleName,
      },
      policies: policiesData,
      
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
    console.log('User Policies:', userPolicies);
console.log('Role Policies:', rolePolicies);
  }
};

module.exports = {
  getUserDetails
};
