import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import LoadingButton from '@mui/lab/LoadingButton';
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
import { alpha, useTheme } from '@mui/material/styles';
import { db, auth } from 'src/firebase';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function SignUpView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [rolePolicies, setRolePolicies] = useState([]);

  // Fetch roles and policies dynamically
  useEffect(() => {
    const fetchRolesAndPolicies = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/roles/getRolesAndPolicies');
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Fetched roles data:', data);
          setRoles(data.roles || []);
        } else {
          throw new Error('Response is not in JSON format');
        }
      } catch (err) {
        console.error('Error fetching roles:', err.message || err);
      }
    };
  
    fetchRolesAndPolicies();
  }, []);

  // Fetch role policies when a role is selected
  const fetchRolePolicies = async (roleId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/roles/getRolePolicies/${roleId}`);
      const data = await response.json();
      console.log('Fetched role policies:', data);
      setRolePolicies(data.policies || []);
    } catch (err) {
      console.error('Error fetching role policies:', err.message || err);
    }
  };

  // Sign up with Email and Password
  const handleSignUpWithEmail = async () => {
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Get the selected role and policy
      const selectedRole = roles.find((r) => r.roleName === role);
      const selectedRoleId = selectedRole?.roleId || uuidv4();
      const selectedPolicy = rolePolicies[0]; // Assuming you want the first policy
      const policyId = selectedPolicy?.policyId || uuidv4();

      // Save the user data in the 'users' collection
      await setDoc(doc(db, 'users', userId), {
        email,
        role,
        roleId: selectedRoleId,
        createdAt: new Date(),
      });

      // Create a new entry in the 'userPolicies' collection
      const userPolicyId = uuidv4(); // Generate a unique ID for this entry
      await setDoc(doc(db, 'userPolicies', userPolicyId), {
        userId,
        roleId: selectedRoleId,
        policyId,
        createdAt: new Date(),
      });

      // Navigate to the dashboard after successful sign-up
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'google',
        createdAt: new Date(),
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'facebook',
        createdAt: new Date(),
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle role change and fetch role policies
  const handleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);

    const selectedRoleId = roles.find((r) => r.roleName === selectedRole)?.roleId;
    if (selectedRoleId) {
      fetchRolePolicies(selectedRoleId);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
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
              <MenuItem key={roleType.roleId} value={roleType.roleName}>
                {roleType.roleName}
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
              <Iconify icon="eva:google-fill" color="#DF3E30" width={24} />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.32) }}
              onClick={handleFacebookLogin}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" width={24} />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              or sign up with email
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
