import React, { useState, useEffect } from 'react';

import { Box, Grid, Paper, Typography } from '@mui/material';

// import StudenAttendece from "src/sections/student-attendence/view/user-view"
import Index from "src/sections/super-admin-dashboard/view/user-view"

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const stats = [
    { title: 'Total Students', value: 452, note: '2 new employees added!' },
    { title: 'On Time', value: 360, note: '-10% Less than yesterday' },
    { title: 'Absent', value: 30, note: '+3% Increase than yesterday' },
    { title: 'Late Arrival', value: 62, note: '+3% Increase than yesterday' },
    { title: 'Early Departures', value: 6, note: '-10% Less than yesterday' },
    { title: 'Time-off', value: 42, note: '2% Increase than yesterday' },
  ];

  return (
    <>
    <Box sx={{ p: 3, backgroundColor: '#f3f4f6' }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#6c63ff' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Time Box - Takes half the width and spans the height of two rows */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 2, height: '100%' }}>
            <Typography variant="h4" sx={{ color: '#6c63ff', fontSize: '2rem' }}>
              {formattedTime}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'gray' }}>
              Realtime Insight
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: 'black', fontSize: '1.1rem' }}>
              Today: {formattedDate}
            </Typography>
          </Paper>
        </Grid>

        {/* Statistics Cards - Arranged in two columns beside the time box */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h3" sx={{ color: '#333', fontSize: '2rem' }}>
                {stat.value}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, color: '#6c63ff', fontSize: '1.1rem' }}>
                {stat.title}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1, fontSize: '0.9rem' }}>
                {stat.note}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
    <Index/>
    </>
  );
}

export default Dashboard;
