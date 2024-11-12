import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    console.log('test1');

    function onConnect() {
      console.log('onConnect');
    }

    function onDisconnect() {
      console.log('onDisconnect');
    }

    function onFooEvent(value) {
      console.log('2');
    }

    const socket = io('http://localhost:3001');
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    ////2-way immediate msgs --> From Server to Client usecase
    // socket.emit('chat_message', 'msg 1 from client');
    // socket.on('following_chat_message', (arg) => {
    //   console.log('msg 2 at client:', arg);
    // });

    ////From Server to Client usecase
    // socket.on('server-chat_message', (msg) => {
    //   console.log('msg at client:', msg);
    // });

    ////From Client to Server usecase
    socket.emit('client-chat_message', 'this is a msg to server');

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat_message', onFooEvent);
      socket.off('following_chat_message', onFooEvent);
      socket.off('client-chat_message', onFooEvent);
    };
  }, []);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
