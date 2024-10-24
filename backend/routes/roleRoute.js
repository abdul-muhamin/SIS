// const express = require('express');
// const { createRolesHandler, getRolesAndPolicies, getRolePolicies } = require('../controller/roleController'); // Adjust the path as needed
// const router = express.Router();

// // POST route to create roles and policies
// router.post('/createRoles', createRolesHandler);

// // GET route to fetch roles and policies
// router.get('/getRolesAndPolicies', getRolesAndPolicies);

// // GET route to fetch role policies only
// router.get('/getRolePolicies', getRolePolicies);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { createRolesHandler, getRolesAndPolicies, getRolePolicies } = require('../controller/roleController');

// Route to create roles
router.post('/createRoles', createRolesHandler);

// Route to get all roles and policies
router.get('/getRolesAndPolicies', getRolesAndPolicies);

// Route to get role policies by roleId
router.get('/getRolePolicies/:roleId', getRolePolicies);

module.exports = router;
