const { db } = require('../config/firebaseConfig'); // Adjust the path as needed
const { createRolesWithPolicies } = require('../services/roles');
// Function to create roles and policies
const createRolesHandler = async (req, res) => {
  try {
    await createRolesWithPolicies();
    res.status(200).json({ message: 'Roles and policies created successfully.' });
  } catch (error) {
    console.error('Error creating roles and policies:', error);
    res.status(500).json({ message: 'Failed to create roles and policies.' });
  }
};

// Function to get all roles and policies
const getRolesAndPolicies = async (req, res) => {
  try {
    console.log("Fetching roles from Firestore...");
    const rolesSnapshot = await db.collection('roles').get();
    console.log("Roles fetched successfully.");

    const roles = rolesSnapshot.docs.map(doc => ({
      roleId: doc.id,
      ...doc.data(),
    }));

    console.log("Fetching role policies from Firestore...");
    const policiesSnapshot = await db.collection('rolespolicies').get();
    console.log("Role policies fetched successfully.");

    const policies = policiesSnapshot.docs.map(doc => ({
      policyId: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ roles, policies });
  } catch (error) {
    console.error('Error fetching roles and policies:', error.message);
    res.status(500).json({ message: `Failed to fetch roles and policies: ${error.message}` });
  }
};

// Function to get policies for a specific role by roleId
const getRolePolicies = async (req, res) => {
  const { roleId } = req.params; // Get the roleId from the request params

  try {
    console.log(`Fetching policies for roleId: ${roleId}...`);

    // Query Firestore for role policies with the specific roleId
    const policiesSnapshot = await db
      .collection('rolespolicies') // Assuming the collection is 'rolespolies'
      .where('roleId', '==', roleId) // Query for documents with the specific roleId
      .get();

    if (policiesSnapshot.empty) {
      return res.status(404).json({ message: `No policies found for roleId: ${roleId}` });
    }

    const rolePolicies = policiesSnapshot.docs.map(doc => ({
      policyId: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ rolePolicies });
  } catch (error) {
    console.error('Error fetching role policies:', error);
    res.status(500).json({ message: 'Failed to fetch role policies.' });
  }
};

module.exports = {
  createRolesHandler,
  getRolesAndPolicies,
  getRolePolicies
};


