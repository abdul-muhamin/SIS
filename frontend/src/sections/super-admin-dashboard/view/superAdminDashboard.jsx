import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Index from "./user-view";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalStudents, setTotalStudents] = useState(0);
  const [attendanceSummary, setAttendanceSummary] = useState({
    onTimeCount: 0,
    absentCount: 0,
    lateArrivals: 0,
    earlyDepartures: 0,
    timeOff: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      const url = import.meta.env.VITE_APP_URL;
      try {
        const response = await fetch(`${url}/api/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setTotalStudents(data.length);
      } catch (error) {
        console.error('Error fetching total students:', error);
      }
    };

    const fetchAttendanceSummary = async () => {
      const url = import.meta.env.VITE_APP_URL;
      try {
        const response = await fetch(`${url}/api//students/attendance-summary?date=${new Date().toISOString().slice(0, 10)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch attendance summary');
        }
        const data = await response.json();
        setAttendanceSummary(data.summary);
      } catch (error) {
        console.error('Error fetching attendance summary:', error);
      }
    };

    fetchTotalStudents();
    fetchAttendanceSummary();
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const stats = [
    { title: 'Total Students', value: totalStudents, note: '2 new employees added!' },
    { title: 'On Time', value: attendanceSummary.onTimeCount, note: '-10% Less than yesterday' },
    { title: 'Absent', value: attendanceSummary.absentCount, note: '+3% Increase than yesterday' },
    { title: 'Late Arrival', value: attendanceSummary.lateArrivals, note: '+3% Increase than yesterday' },
    { title: 'Early Departures', value: attendanceSummary.earlyDepartures, note: '-10% Less than yesterday' },
    { title: 'Time-off', value: attendanceSummary.timeOff, note: '2% Increase than yesterday' },
  ];

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: '#f3f4f6' }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#6c63ff' }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Time Box spanning two rows */}
          <Grid item xs={12} md={3} lg={3} sx={{ gridRow: 'span 2' }}>
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

          {/* Statistic Boxes in 1 row each */}
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
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
      <Index />
    </>
  );
}

export default Dashboard;
