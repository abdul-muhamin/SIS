import { query, where, getDocs, collection } from 'firebase/firestore';

import { db } from 'src/firebase';

import SvgColor from 'src/components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// Function to get dynamic navConfig based on localStorage
export const getNavConfig = () => {
  const fetchAndJoinPolicies = async (userId, roleId) => {
  //  debugger 
   console.log('Function started');
    try {
      // Query user policies based on userId
      const userPoliciesQuery = query(
        collection(db, 'userPolicies'),
        where('userId', '==', userId)
      );
      // console.log('User Policies Query:', userPoliciesQuery);
  
      // Fetch user policies
      const userPoliciesSnapshot = await getDocs(userPoliciesQuery);
      const userPolicies = userPoliciesSnapshot.docs.map((doc1) => doc1.data());
      // console.log('User Policies:', userPolicies);
  
      // Query role policies based on roleId
      const rolePoliciesQuery = query(
        collection(db, 'rolespolicies'),
        where('roleId', '==', roleId)
      );
      // console.log('Role Policies Query:', rolePoliciesQuery);
  
      // Fetch role policies
      const rolePoliciesSnapshot = await getDocs(rolePoliciesQuery);
      const rolePolicies = rolePoliciesSnapshot.docs.map((doc1) => doc1.data());
      // console.log('Role Policies:', rolePolicies);
  
      // Combine policies
      const combinedPolicies = [...userPolicies, ...rolePolicies];
      // console.log('Combined Policies:', combinedPolicies);
      
    } catch (err) {
      console.error('Error fetching policies:', err);
    }
  };
  
  // Call the function with specific userId and roleId for testing
  fetchAndJoinPolicies('VBEpxI3lV6PIw2agZgzfVM8NePx1', 'bb712ebe-874b-496d-92cc-ba343a483586');
  
  const userPolicies = JSON.parse(localStorage.getItem('userPolicies')) || [];

  // Sort policies by 'order' field
  const sortedUserPolicies = userPolicies.sort((a, b) => a.order - b.order);

  // Build dynamic navConfig based on sorted user policies
  return sortedUserPolicies.map(policy => ({
    title: policy.URL_Name,  // Use the name from the policy for the title
    path: policy.URL,        // URL from policies
    icon: icon('ic_user'),   // Icon for each policy item
  }));
};

// // Function to generate title from URL
// // const generateTitleFromUrl = (url) => {
// //   const formattedTitle = url.replace(/[^a-zA-Z0-9]/g, ' ');  // Replace non-alphanumeric characters with spaces
// //   return formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1); // Capitalize the first letter
// // };
