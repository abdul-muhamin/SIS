import React from 'react';

import {
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
} from '@mui/material';

// import SearchIcon from '@mui/icons-material/Search';
// import Iconify from 'src/components/iconify';
import AddAssignmentTopBar from './addAssignmentTopBar';

const AddAssignmentView = () => (
  <>
    {/* Top Bar */}

    <AddAssignmentTopBar/>

    {/* Main Content */}
    <Box sx={{ padding: '20px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          {/* Title */}
          <Typography variant="h4" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
            Add Assignment
          </Typography>

          {/* Form Container */}
          <Paper elevation={3} sx={{ padding: '20px', borderRadius: '12px' }}>
            <form>
              {/* Message Text Field */}
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Message"
                variant="outlined"
                sx={{ mb: 4 }}
              />

              {/* Action Buttons */}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: '#7B61FF', mr: 2 }}
                >
                  Add Assignment
                </Button>
                <Button variant="contained" color="inherit">
                  Cancel
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </>
);

export default AddAssignmentView;
