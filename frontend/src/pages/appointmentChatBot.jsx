import { Helmet } from 'react-helmet-async';

// import Index from 'src/sections/appointmentChatbot/index';
import Chatbot from 'src/sections/appointmentChatbot/index'

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> ChatArea | Minimal UI </title>
      </Helmet>

      <Chatbot />
    </>
  );
}
