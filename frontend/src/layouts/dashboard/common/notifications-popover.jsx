// import PropTypes from 'prop-types';
// import { io } from 'socket.io-client';
// import { useState, useEffect } from 'react';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import Badge from '@mui/material/Badge';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import Divider from '@mui/material/Divider';
// import Tooltip from '@mui/material/Tooltip';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
// // Import Iconify and Scrollbar if they are custom components
// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';

// export default function NotificationsPopover() {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(null);
//   const [totalUnRead , setTotalUnRead] = useState(0)

//   useEffect(() => {
//     const socket = io('http://localhost:3001');
//     const userId = localStorage.getItem('userId');

//     if (userId) {
//       socket.emit("joinRoom", userId); // Join room for current user
//     }

//     // Fetch existing notifications
//     const fetchNotifications = async () => {
//       try {
//         if (!userId) {
//           console.error("UserId is not available.");
//           return;
//         }
//         const response = await fetch(`http://localhost:3001/api/notification?userId=${userId}`);
//         const data = await response.json();
//         setNotifications(data.notifications);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchNotifications();

//     // Listen for real-time notifications specific to the user
//     socket.on("receiveNotification", (data) => {
//       setNotifications((prevNotifications) => [data, ...prevNotifications]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(()=>{
//     setTotalUnRead (notifications?.filter((item) => item.isRead === false).length || 0)
//   },[notifications])

//   const handleOpen = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleClose = () => {
//     setOpen(null);
//   };

//   const handleMarkAllAsRead = async () => {
//     try {
//       const userId = localStorage.getItem('userId');
//       await fetch(`http://localhost:3001/api/notification/markAllAsRead?userId=${userId}`, {
//         method: "PUT",
//       });

//       setNotifications((prev) =>
//         prev?.map((notification) => ({
//           ...notification,
//           isRead: true,
//         }))
//       );
//     } catch (error) {
//       console.error("Error marking notifications as read:", error);
//     }
//   };

//   return (
//     <>
//       <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
//         <Badge badgeContent={totalUnRead} color="error">
//           <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
//         </Badge>
//       </IconButton>

//       <Popover
//         open={!!open}
//         anchorEl={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           sx: { mt: 1.5, ml: 0.75, width: 360 },
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="subtitle1">Notifications</Typography>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               You have {totalUnRead} unread messages
//             </Typography>
//           </Box>

//           {totalUnRead > 0 && (
//             <Tooltip title="Mark all as read">
//               <IconButton color="primary" onClick={handleMarkAllAsRead}>
//                 <Iconify icon="eva:done-all-fill" />
//               </IconButton>
//             </Tooltip>
//           )}
//         </Box>

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
//           <List
//             disablePadding
//             subheader={
//               <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
//                 New
//               </ListSubheader>
//             }
//           >
//             {notifications?.map((notification) => (
//               <NotificationItem key={notification._id} notification={notification} />
//             ))}
//           </List>
//         </Scrollbar>

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <Box sx={{ p: 1 }}>
//           <Button fullWidth disableRipple>
//             View All
//           </Button>
//         </Box>
//       </Popover>
//     </>
//   );
// }

// function NotificationItem({ notification }) {
//   const title = (
//     <Typography variant="subtitle2">
//       {notification.message}
//       <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
//         &nbsp; {notification.description}
//       </Typography>
//     </Typography>
//   );

//   return (
//     <ListItemButton
//       sx={{
//         py: 1.5,
//         px: 2.5,
//         mt: '1px',
//         ...(notification.isRead === false && {
//           bgcolor: 'action.selected',
//         }),
//       }}
//     >
//       <ListItemAvatar>
//         <Avatar sx={{ bgcolor: 'background.neutral' }}>
//           <Iconify icon="eva:bell-outline" />
//         </Avatar>
//       </ListItemAvatar>
//       <ListItemText
//         primary={title}
//         secondary={
//           <Typography
//             variant="caption"
//             sx={{
//               mt: 0.5,
//               display: 'flex',
//               alignItems: 'center',
//               color: 'text.disabled',
//             }}
//           >
//             {new Date(notification.createdAt).toLocaleString()}
//           </Typography>
//         }
//       />
//     </ListItemButton>
//   );
// }

// NotificationItem.propTypes = {
//   notification: PropTypes.shape({
//     _id: PropTypes.string,
//     message: PropTypes.string,
//     description: PropTypes.string,
//     isRead: PropTypes.bool,
//     createdAt: PropTypes.string,
//   }).isRequired,
// };


import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Divider,
  Tooltip,
  Popover,
  Typography,
  IconButton,
  ListItemAvatar,
  ListItemButton,ListItemText,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import NotificationsModal from './noticationModel';

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalUnRead, setTotalUnRead] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await fetch(`http://localhost:3001/api/notification?userId=${userId}`);
        const data = await response.json();
        setNotifications(data || []);
        setTotalUnRead(data?.filter((item) => !item?.isRead).length || 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await fetch(`http://localhost:3001/api/notification/markAllAsRead?userId=${userId}`, { method: "PUT" });

      setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
      setTotalUnRead(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const handleViewAll = () => {
    setModalOpen(true);
    handleClose();
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { mt: 1.5, ml: 0.75, width: 360 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>
          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {loading ? (
            <Box sx={{ p: 2 }}>Loading notifications...</Box>
          ) : (
            <List disablePadding>
              {notifications.map((notification) => (
                <NotificationItem key={notification._id} notification={notification} />
              ))}
            </List>
          )}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={handleViewAll}>
            View All
          </Button>
        </Box>
      </Popover>

      <NotificationsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        notifications={notifications}
        setNotifications={setNotifications}
        setTotalUnRead={setTotalUnRead}
      />
    </>
  );
}

function NotificationItem({ notification }) {
  return (
    <ListItemButton sx={{ py: 1.5, px: 2.5, mt: '1px', ...(notification.isRead === false && { bgcolor: 'action.selected' }) }}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>
          <Iconify icon="eva:bell-outline" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={<Typography variant="subtitle2">{notification.message}</Typography>} />
    </ListItemButton>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.string,
    message: PropTypes.string.isRequired,
    isRead: PropTypes.bool,
  }).isRequired,
};



// new

// NotificationsPopover.js
// import { useState, useEffect } from 'react';
// import { Box, Badge, Button, Popover, Typography, IconButton, Tooltip, Divider } from '@mui/material';
// import Iconify from 'src/components/iconify';
// import NotificationsModal from './noticationModel';

// export default function NotificationsPopover() {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(null);
//   const [totalUnRead, setTotalUnRead] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) return;

//         const response = await fetch(`http://localhost:3001/api/notification?userId=${userId}`);
//         const data = await response.json();
//         setNotifications(data || []);
//         setTotalUnRead(data?.filter((item) => !item?.isRead).length || 0);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const handleOpen = (event) => setOpen(event.currentTarget);
//   const handleClose = () => setOpen(null);

//   const handleViewAll = () => {
//     setModalOpen(true);
//     handleClose();
//   };

//   const handleModalClose = () => setModalOpen(false);

//   return (
//     <>
//       <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
//         <Badge badgeContent={totalUnRead} color="error">
//           <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
//         </Badge>
//       </IconButton>

//       <Popover
//         open={!!open}
//         anchorEl={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{ sx: { mt: 1.5, ml: 0.75, width: 360 } }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="subtitle1">Notifications</Typography>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               You have {totalUnRead} unread messages
//             </Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <Box sx={{ p: 1 }}>
//           <Button fullWidth onClick={handleViewAll}>
//             View All
//           </Button>
//         </Box>
//       </Popover>

//       <NotificationsModal
//         open={modalOpen}
//         onClose={handleModalClose}
//         notifications={notifications}
//         setNotifications={setNotifications}
//         setTotalUnRead={setTotalUnRead}
//       />
//     </>
//   );
// }

