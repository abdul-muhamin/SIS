
import SvgColor from 'src/components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// Function to get dynamic navConfig based on localStorage
export const getNavConfig = () => {
  
  const userPolicies = JSON.parse(localStorage.getItem('userPolicies')) || [];

  // Sort policies by 'order' field
  const sortedUserPolicies = userPolicies.sort((a, b) => a.order - b.order);

  // Build dynamic navConfig based on sorted user policies
  return sortedUserPolicies.map(policy => ({
    title: policy.URL_Name,  // Use the name from the policy for the title
    path: policy.URL,        // URL from policies
    icon: icon(policy.Icon),   // Icon for each policy item
  }));
};

