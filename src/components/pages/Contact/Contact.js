import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, Button, Paper } from "@material-ui/core";
import { VideoCall } from "@material-ui/icons";
import { Form } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { database, db } from "../../../Firebase/firebase.config";
import { ref, set, onValue, push } from "firebase/database";
import { doc, getDocs, collection, query, where, getDoc } from "firebase/firestore";
import CustomAvatar from "../CustomAvatar/CustomAvatar";
import "./Contact.css";

const Contact = () => {
  const { user } = useAuth();
  const [isDoctor, setIsDoctor] = useState(false);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const [message, setMessage] = useState("");
  const [showChatConvo, setShowChatConvo] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const chatSectionRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const checkIfDoctor = async () => {
      const userDocRef = doc(db, "doctors", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      setIsDoctor(userDocSnap.exists());
    };

    checkIfDoctor();
  }, [user]);

  useEffect(() => {
    if (isDoctor) fetchActiveUsers();
    else fetchOnlineDoctors();
  }, [isDoctor, user]);

  const fetchOnlineDoctors = async () => {
    const doctorsRef = collection(db, "doctors");
    const q = query(doctorsRef, where("isOnline", "==", true));
    const querySnapshot = await getDocs(q);
    const doctors = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOnlineDoctors(doctors);
  };

  const fetchActiveUsers = async () => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setActiveUsers(users);
  };

  useEffect(() => {
    if (!user || !selectedParticipant) return;

    const chatId = isDoctor
      ? `${selectedParticipant.id}-${user.uid}`
      : `${user.uid}-${selectedParticipant.id}`;

    const chatRef = ref(database, `chats/${chatId}/messages`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      setMsgList(data ? Object.values(data) : []);
    });
  }, [user, selectedParticipant, isDoctor]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedParticipant) return;

    const newMessage = {
      user: user.displayName || "Anonymous",
      userId: user.uid,
      text: message,
      timestamp: new Date().toISOString(),
    };

    const chatId = isDoctor
      ? `${selectedParticipant.id}-${user.uid}`
      : `${user.uid}-${selectedParticipant.id}`;

    const chatRef = ref(database, `chats/${chatId}/messages`);
    const newMessageRef = push(chatRef);

    await set(newMessageRef, newMessage);
    setMessage("");
  };

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    myVideo.current.srcObject = stream;
    const connection = new RTCPeerConnection();
    connection.addStream(stream);

    connection.ontrack = (event) => {
      userVideo.current.srcObject = event.streams[0];
    };

    connection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send ICE candidate to the other peer
      }
    };

    connectionRef.current = connection;
  };

  const endCall = () => {
    connectionRef.current.close();
    connectionRef.current = null;
    myVideo.current.srcObject.getTracks().forEach(track => track.stop());
    userVideo.current.srcObject.getTracks().forEach(track => track.stop());
  };

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
    setShowChatConvo(true);
    setSelectedSpecialist(participant.id);
    setTimeout(() => chatSectionRef.current.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <Container fluid className="chat-room">
      <Grid container>
        <Grid item xs={12} md={4} className="participants-list">
          <Typography variant="h6">{isDoctor ? "Users" : "Online Doctors"}</Typography>
          <List>
            {(isDoctor ? activeUsers : onlineDoctors).map((participant) => (
              <ListItem
                key={`${isDoctor ? "user" : "doctor"}-${participant.id}`}
                selected={selectedParticipant && selectedParticipant.id === participant.id}
                onClick={() => handleParticipantClick(participant)}
                button
              >
                <ListItemAvatar>
                  <CustomAvatar name={participant.name} imgUrl={participant.imgUrl} />
                </ListItemAvatar>
                <ListItemText primary={participant.name} secondary={isDoctor ? participant.email : participant.speciality} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={8} className="chat-section" ref={chatSectionRef}>
          <div className="d-flex chat-panel chat-regular-text border-top">
            <div className="flex-shrink-0 border-end h-100 chat-user-feed bg-light pb-5">
              <div>
                <div className="border-bottom px-3 chat-title-box d-flex justify-content-between align-items-center">
                  <span className="chat-panel-title">Messages</span>
                </div>
              </div>
              <div className="mt-4 px-2">
                <div className="d-flex flex-column gap-3">
                  {msgList.map((msg, index) => (
                    <div key={index} className="chat-message-text chat-regular-text bg-light p-2 rounded-3 my-3">
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {showChatConvo ? (
              <div className="flex-grow-1 chat-message-feed">
                <div className="chat-title-box px-4 border-bottom">
                  <div className="d-flex align-items-center h-100 gap-3 ">
                    <div className="fs-2 text-secondary chat-user-item chat-convo-back" onClick={() => setShowChatConvo(false)}>
                      <i className="bi bi-arrow-left-circle"></i>
                    </div>
                    <div className="d-flex h-100 gap-2 align-items-center">
                      <CustomAvatar name={selectedParticipant.name} imgUrl={selectedParticipant.imgUrl} />
                      <div className="d-flex flex-column">
                        <span className="chat-regular-text chat-user-name">{selectedParticipant.name}</span>
                        <span className="chat-small-text">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-5 h-auto">
                  <div className="chat-convo-section">
                    {msgList.map((msg, index) => (
                      <div key={index}>
                        <p className="chat-message-text chat-regular-text bg-light p-2 rounded-3 my-3">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="d-flex gap-2 chat-text-field-box">
                      <Form.Group className="flex-grow-1">
                        <Form.Control
                          className="h-100 rounded-pill"
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="info" className="text-white rounded-circle" onClick={handleSendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="chat-init-right flex-grow-1">
                <p className="text-center w-100 fs-5 pt-5">Click any specialist to start chat.</p>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <video playsInline muted ref={myVideo} autoPlay style={{ width: "100%" }} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <video playsInline ref={userVideo} autoPlay style={{ width: "100%" }} />
          </Paper>
        </Grid>
        <Grid item xs={12} className="text-center">
          <Button variant="contained" color="primary" onClick={startCall}>
            Start Call
          </Button>
          <Button variant="contained" color="secondary" onClick={endCall} style={{ marginLeft: "10px" }}>
            End Call
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
