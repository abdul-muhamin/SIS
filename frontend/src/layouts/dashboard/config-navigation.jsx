import SvgColor from 'src/components/svg-color';
import { doc, setDoc ,collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from 'src/firebase';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// Function to get dynamic navConfig based on localStorage
export const getNavConfig = () => {
  const fetchAndJoinPolicies = async (userId, roleId) => {
    console.log('abc')
    try {
      // Fetch user policies based on userId
      // debugger
      const userPoliciesQuery = query(
        collection(db, 'userPolicies'),
        where('userId', '==', userId)
      );
      console.log( "userPoliciesQuery" , userPoliciesQuery)
      const rolePoliciesQuery = query(

        collection(db, 'rolePolicies'),
        where('roleId', '==', roleId)
      );
      const rolePoliciesSnapshot = await getDocs(rolePoliciesQuery);
      console.log(rolePoliciesSnapshot)
      const userPoliciesSnapshot = await getDocs(userPoliciesQuery);
      const userPolicies = userPoliciesSnapshot.docs.map((col) => col.data());
  
      // Fetch role policies based on roleId
      const rolePolicies = rolePoliciesSnapshot.docs.map((col) => col.data());
  
      // Combine policies - You can adjust this based on how you want to join them
      const combinedPolicies = [...userPolicies, ...rolePolicies];
      
      // Log the combined policies
      console.log('Combined Policies:', combinedPolicies);
  
    } catch (err) {
      console.error('Error fetching policies:', err);
    }
  };
  
  // Call the function with a specific userId and roleId for testing
  // Example values, replace these with real IDs when calling the function
  fetchAndJoinPolicies('69siAkQnyad0iQ54W9HLLiVt7p32', '88a45b4e-6785-4c45-a1cc-e39214924b03');
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
