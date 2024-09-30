import React from 'react'

import {
  Box,
  Avatar,
  Divider,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

import Iconify from 'src/components/iconify';

const addAssignmentTopBar = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#F3F4F6',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      {/* Left Section - Logo or Title */}
      <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
        Student System
      </Typography>

      {/* Middle Section - Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Quick Search..."
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          width: '300px',
          backgroundColor: 'white',
          borderRadius: '8px',
        }}
      />

      {/* Right Section - Admin Profile */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '30px' }} />
        <Avatar alt="Admin" src="/path/to/admin-image.jpg" sx={{ width: 40, height: 40 }} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            Admin
          </Typography>
          <Typography variant="body2" color="textSecondary">
            admin@domain.in
          </Typography>
        </Box>
      </Box>
    </Box>
  )

export default addAssignmentTopBar
