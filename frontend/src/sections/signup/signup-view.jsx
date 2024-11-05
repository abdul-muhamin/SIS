import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
// import { doc, setDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Card,
  Stack,
  Button,
  Select,
  Divider,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

import { db, auth } from 'src/firebase';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function SignUpView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName,setFullName ] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);

  // Fetch roles dynamically
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/roles/getRolesAndPolicies');
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setRoles(data.roles || []);
        } else {
          throw new Error('Response is not in JSON format');
        }
      } catch (err) {
        console.error('Error fetching roles:', err.message || err);
      }
    };

    fetchRoles();
  }, []);
// fetch and join 




const handleSignUpWithEmail = async () => {
  setLoading(true);
  setError('');
  const url = import.meta.env.VITE_APP_URL;

  if (password !== confirmPassword) {
    setError("Passwords don't match");
    setLoading(false);
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    const selectedRole = roles.find((r) => r.roleName === role);
    if (!selectedRole) {
      setError('Please select a valid role');
      setLoading(false);
      return;
    }

    // debugger
    const selectedRoleId = selectedRole.roleId;
    // Check if the role requires saving data in MongoDB
    if (role === 'STUDENT' || role === 'STAFF') {
      const apiEndpoint = role === 'STUDENT' ? '/api/students' : '/api/teachers';
      const idField = role === 'STUDENT' ? 'studentId' : 'staffId';

      // Save the user data in MongoDB based on the selected role
      await fetch(`${url}${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fullName,
          [idField]: userId,
          role: selectedRole.roleName,
        }),
      });
    }

    // Save user data in Firebase for all roles
    await setDoc(doc(db, 'users', userId), {
      email,
      fullName,
      userId,
      role: selectedRole.roleName,
      roleId: selectedRoleId,
      createdAt: new Date(),
    });

    // Fetch and save role policies
    const policiesResponse = await fetch(`${url}/api/roles/getRolePolicies/${selectedRoleId}`);
    const policiesData = await policiesResponse.json();
    const policies = policiesData.rolePolicies || [];

    const userPolicyPromises = policies.map(async (policy) => {
      const userPolicyId = uuidv4();
      return setDoc(doc(db, 'userPolicies', userPolicyId), {
        rolePolicyId: policy.rolePolicyId,
        roleId: policy.roleId,
        userId,
        userPolicyId,
      });
    });

    await Promise.all(userPolicyPromises);
    navigate('/');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};



  

  const handleSocialLogin = async (provider) => {
    const url= import.meta.env.VITE_APP_URL;
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      // Use the first role as a default
      const selectedRole = roles[0]; // Prompt user to choose if required
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: provider instanceof GoogleAuthProvider ? 'google' : 'facebook',
        role: selectedRole?.roleName,
        roleId: selectedRole?.roleId,
        createdAt: new Date(),
      });

      // Fetch and save role policies
      const policiesResponse = await fetch(`${url}/api/roles/getRolePolicies/${selectedRole.roleId}`);
      const policiesData = await policiesResponse.json();
      const policies = policiesData.rolePolicies || [];

      const userPolicyPromises = policies.map(async (policy) => {
        const userPolicyId = uuidv4();
        return setDoc(doc(db, 'userPolicies', userPolicyId), {
          ...policy,
          userId: user.uid,
          userPolicyId,
        });
      });

      await Promise.all(userPolicyPromises);
      localStorage.setItem('userPolicies', JSON.stringify(policies));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => handleSocialLogin(new GoogleAuthProvider());
  const handleFacebookLogin = () => handleSocialLogin(new FacebookAuthProvider());

  // Handle role change
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
      <TextField
          name="fullName"
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            {roles.map((roleType) => (
              <MenuItem key={roleType?.roleId} value={roleType?.roleName}>
                {roleType?.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
        loading={loading}
        onClick={handleSignUpWithEmail}
      >
        Sign Up
      </LoadingButton>
    </>
  );

  return (
    <Box>
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign up for Minimal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link to="/" variant="subtitle2" style={{ marginLeft: 2 }}>
              Login
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.32) }}
              onClick={handleGoogleLogin}
            >
              <Iconify icon="eva:google-fill" color="#DF4930" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.32) }}
              onClick={handleFacebookLogin}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}




