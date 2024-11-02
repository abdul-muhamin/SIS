import { signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from "firebase/firestore";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { auth } from "../../../firebase"; // Import Firestore methods

const db = getFirestore(); // Initialize Firestore

const MENU_OPTIONS = [
  { label: 'Home', icon: 'eva:home-fill' },
  { label: 'Profile', icon: 'eva:person-fill' },
  { label: 'Settings', icon: 'eva:settings-2-fill' },
];

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState({ displayName: '', email: '', role: '' });
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserRole = async (currentUser) => {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({
            displayName: currentUser.email.split('@')[0],
            email: currentUser.email,
            role: userDoc.data().role || 'No role defined', // Fetch role from Firestore
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    const { currentUser } = auth;
    if (currentUser) {
      fetchUserRole(currentUser);
    }
  }, []); 

  const handleOpen = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar sx={{ width: 36, height: 36, border: (theme) => `solid 2px ${theme.palette.background.default}` }}>
          {user.email ? user.email.charAt(0).toUpperCase() : ''}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { p: 0, mt: 1, ml: 0.75, width: 200 },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.role}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
        
        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
