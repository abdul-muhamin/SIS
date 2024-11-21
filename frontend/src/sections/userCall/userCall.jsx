import React, { useRef, useState, useEffect } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import AssignmentIcon from "@mui/icons-material/Assignment";

// Connect to the backend
const socket = io.connect("http://localhost:3001");

function App() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [myName, setMyName] = useState("");
  const [callerName, setCallerName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (myVideo.current) {
          myVideo.current.srcObject = mediaStream;
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name, signal }) => {
      setReceivingCall(true);
      setCaller(from);
      setCallerName(name);
      setCallerSignal(signal);
    });

    socket.on("callEnded", () => {
      console.log("Call ended by remote user.");
      endCallCleanup();
    });

    return () => {
      socket.off("me");
      socket.off("callUser");
      socket.off("callEnded");
    };
  }, []);

  useEffect(() => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: myName,
      });
    });

    peer.on("stream", (receivedStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = receivedStream;
      }
    });

    socket.once("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (receivedStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = receivedStream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit("endCall", { to: caller || idToCall });
    endCallCleanup();
  };

  const endCallCleanup = () => {
    setCallEnded(false);
    setCallAccepted(false);
    setReceivingCall(false);
    setCaller("");
    setCallerName("");
    setCallerSignal(null);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    connectionRef.current = null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column"  ,overflow:"hidden"}}>
      <h1 style={{ textAlign: "center", color: "#1976d2" }}>Virtual Classroom</h1>

      <div
        style={{
          display: "flex",
          flexDirection: callAccepted ? "row" : "column",
          justifyContent: callAccepted ? "space-between" : "center",
          alignItems: "center",
          width: "100%",
          gap: "20px",
        }}
      >
        {stream && (
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: "45%", borderRadius: "10px", border: "2px solid #1976d2" }}
          />
        )}

        {callAccepted && (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            style={{ width: "45%", borderRadius: "10px", border: "2px solid #1976d2" }}
          />
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Your Name"
          value={myName}
          onChange={(e) => setMyName(e.target.value)}
          style={{ minWidth: "200px" }}
        />

        {me?(
        <CopyToClipboard text={me}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AssignmentIcon />}
            style={{ minWidth: "150px" }}
          >
            Copy ID
          </Button>
        </CopyToClipboard>

        ):(
          <p>loading id</p>
        )}


        <TextField
          label="ID to Call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          style={{ minWidth: "200px" }}
        />

        {callAccepted ? (
          <Button
            color="secondary"
            variant="contained"
            onClick={leaveCall}
            style={{ minWidth: "150px" }}
          >
            End Call
          </Button>
        ) : (
          <IconButton
            color="primary"
            aria-label="call"
            onClick={() => callUser(idToCall)}
            style={{ backgroundColor: "#e3f2fd", padding: "10px" }}
          >
            <PhoneIcon />
          </IconButton>
        )}
      {receivingCall && !callAccepted && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
          <h2>{callerName} is calling...</h2>
          </span>
        </div>
      )}
      </div>

    </div>
  );
}

export default App;
