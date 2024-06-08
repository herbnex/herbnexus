import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Paper,
} from '@mui/material';
import { VideoCall, Search, Send } from '@mui/icons-material';
import { ref, set, onValue, push } from 'firebase/database';
import { database, db } from '../../../Firebase/firebase.config';
import { doc, getDocs, collection, query, where, getDoc } from 'firebase/firestore';
import useAuth from '../../../hooks/useAuth';
import { generateChatId } from '../../../utils/generateChatId';
import Peer from 'peerjs';
import './Contact.css';

const CustomAvatar = ({ name, imgUrl }) => {
  const nameParts = name?.split(" ");
  const initials = nameParts?.map((part) => part?.charAt(0).toUpperCase())?.join("");

  return (
    <Avatar sx={{ bgcolor: 'primary.main' }}>
      {imgUrl ? <img src={imgUrl} alt={"user profile"} style={{ width: '100%', height: '100%' }} /> : initials}
    </Avatar>
  );
};

const Contact = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const [message, setMessage] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const msgBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const chatSectionRef = useRef(null);
  const [visibleTimestamps, setVisibleTimestamps] = useState({});
  const [showChatConvo, setShowChatConvo] = useState(false);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const peerInstance = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated!");
      return;
    }

    const checkIfDoctor = async () => {
      const userDocRef = doc(db, "doctors", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setIsDoctor(true);
      } else {
        setIsDoctor(false);
      }
    };

    checkIfDoctor();
  }, [user]);

  useEffect(() => {
    if (isDoctor) {
      fetchActiveUsers();
    } else {
      fetchOnlineDoctors();
    }
  }, [isDoctor, user]);

  const fetchOnlineDoctors = async () => {
    const doctorsRef = collection(db, "doctors");
    const q = query(doctorsRef, where("isOnline", "==", true));
    const querySnapshot = await getDocs(q);
    const doctors = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched online doctors:", doctors);

    // Deduplicate doctors
    const uniqueDoctors = doctors.filter(
      (doctor, index, self) => index === self.findIndex((d) => d.id === doctor.id),
    );

    setOnlineDoctors(uniqueDoctors);
  };

  const fetchActiveUsers = async () => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched active users:", users);

    // Deduplicate users
    const uniqueUsers = users.filter((user, index, self) => index === self.findIndex((u) => u.id === user.id));

    setActiveUsers(uniqueUsers);
  };

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
    setShowChatConvo(true);
  };

  const startCall = async () => {
    if (!selectedParticipant) return;

    const peer = new Peer(user.uid);

    peer.on('open', (id) => {
      console.log('My peer ID is:', id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
        myVideo.current.play();
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          userVideo.current.srcObject = remoteStream;
          userVideo.current.play();
        });
      }).catch((err) => {
        console.error('Failed to get local stream', err);
      });
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
      myVideo.current.play();
      const call = peer.call(selectedParticipant.uid, stream);
      call.on('stream', (remoteStream) => {
        userVideo.current.srcObject = remoteStream;
        userVideo.current.play();
      });
    }).catch((err) => {
      console.error('Failed to get local stream', err);
    });

    peerInstance.current = peer;
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (peerInstance.current) {
      peerInstance.current.destroy();
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedParticipant) {
      return;
    }

    const newMessage = {
      user: user.displayName || "Anonymous",
      userId: user.uid,
      text: message,
      timestamp: new Date().toISOString(),
    };

    const chatId = isDoctor
      ? generateChatId(selectedParticipant.id, user.displayName)
      : generateChatId(user.uid, selectedParticipant.name);

    const chatRef = ref(database, `chats/${chatId}/messages`);
    const newMessageRef = push(chatRef);

    await set(newMessageRef, newMessage);
    console.log("Sent message:", newMessage);
    setMessage("");
    resetTextarea();

    await set(ref(database, `chats/${chatId}/typing`), { typing: false });

    // Scroll to the bottom after sending a message
    setTimeout(() => {
      if (msgBoxRef.current) {
        msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleTyping = async (e) => {
    setMessage(e.target.value);

    const chatId = isDoctor
      ? generateChatId(selectedParticipant.id, user.displayName)
      : generateChatId(user.uid, selectedParticipant.name);

    if (e.target.value.trim()) {
      await set(ref(database, `chats/${chatId}/typing`), { typing: user.uid });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(async () => {
        await set(ref(database, `chats/${chatId}/typing`), { typing: false });
      }, 7000);
    } else {
      await set(ref(database, `chats/${chatId}/typing`), { typing: false });
    }

    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const resetTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.value = "";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const toggleTimestamp = (index) => {
    setVisibleTimestamps((prev) => ({
      ...prev,
      [index]: true,
    }));

    setTimeout(() => {
      setVisibleTimestamps((prev) => ({
        ...prev,
        [index]: false,
      }));
    }, 3000); // Hide the timestamp after 3 seconds
  };

  const ChatMessageFeed = ({ texts, setShowChatConvo, backBtnClick }) => {
    return (
      <div className="flex-grow-1 chat-message-feed">
        <div className="chat-title-box px-4 border-bottom">
          <div className="d-flex align-items-center h-100 gap-3 ">
            <div
              className="fs-2 text-secondary chat-user-item chat-convo-back"
              onClick={() => {
                backBtnClick();
                setShowChatConvo(false);
              }}>
              <i className="bi bi-arrow-left-circle"></i>
            </div>
            <div className="d-flex h-100 gap-2 align-items-center">
              <CustomAvatar name={"john doe"} />
              <div className="d-flex flex-column">
                <span className="chat-regular-text chat-user-name">John Doe</span>
                <span className="chat-small-text">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 pb-5 h-auto">
          <div className="chat-convo-section">
            {texts?.map((text, index) => (
              <div key={index}>
                <p className="chat-message-text chat-regular-text bg-light p-2 rounded-3 my-3">{text.user1}</p>
                <p className="ms-auto chat-message-text chat-regular-text bg-dark text-white p-2 rounded-3 my-3">
                  {text.user2}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4">
            <div className="d-flex gap-2 chat-text-field-box">
              <Form.Group className="flex-grow-1">
                <Form.Control className="h-100 rounded-pill" placeholder="Type your message..." />
              </Form.Group>
              <Button variant="info" className="text-white rounded-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send-fill"
                  viewBox="0 0 16 16">
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChatUserItem = ({ name, imgUrl, field, lastSeen, isOnline, handleClick, selectedSpecialist }) => {
    return (
      <div
        className={`d-flex chat-user-item align-items-center gap-2 bg-white p-3 rounded-3 ${
          selectedSpecialist && selectedSpecialist === "eg" ? "border border-primary border-2 opacity-75" : ""
        }`}
        onClick={handleClick}>
        <CustomAvatar name={name} imgUrl={""} />
        <div className="d-flex flex-shrink-0 flex-column">
          <span className="chat-user-name">{name}</span>
          <span className="chat-small-text">{field}</span>
        </div>
        <span className="ms-auto chat-small-text">
          {isOnline ? (
            <>
              <span className="chat-online-indicator me-1"></span>
              online
            </>
          ) : (
            lastSeen
          )}
        </span>
      </div>
    );
  };

  const ChatUserFeed = ({ setShowChatConvo, setSelectedSpecialist, selectedSpecialist }) => {
    const [showSearch, setShowSearch] = useState(false);

    const handleClick = () => {
      setShowChatConvo(true);
      setSelectedSpecialist("eg");
    };

    return (
      <div className="flex-shrink-0 border-end h-100 chat-user-feed bg-light pb-5">
        <div className="">
          <div className="border-bottom px-3 chat-title-box d-flex justify-content-between align-items-center">
            <span className="chat-panel-title">Messages</span>
            {!showSearch && (
              <span className="chat-panel-title-search" onClick={() => setShowSearch(true)}>
                <i className="bi bi-search"></i>
              </span>
            )}
          </div>
          {showSearch && (
            <div className="px-3 mt-2">
              <Form.Control
                type="text"
                className="border-0"
                placeholder="Search here..."
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </div>
          )}
        </div>
        <div className="mt-4 px-2 ">
          <div className="d-flex flex-column gap-3">
            <ChatUserItem
              field={"herbalist"}
              handleClick={() => {}}
              lastSeen={"2hr"}
              name={"John Doe"}
              imgUrl={""}
              isOnline={false}
            />
            <ChatUserItem
              field={"herbalist"}
              handleClick={handleClick}
              selectedSpecialist={selectedSpecialist}
              lastSeen={"2hr"}
              name={"John Doe"}
              imgUrl={""}
              isOnline={true}
            />
            <ChatUserItem field={"herbalist"} lastSeen={"2hr"} name={"John Doe"} imgUrl={""} isOnline={true} />
            {/* Add more ChatUserItem components as needed */}
          </div>
        </div>
      </div>
    );
  };

  const ChatPanel = () => {
    return (
      <div className="d-flex chat-panel chat-regular-text border-top">
        <ChatUserFeed
          setShowChatConvo={setShowChatConvo}
          selectedSpecialist={selectedSpecialist}
          setSelectedSpecialist={setSelectedSpecialist}
        />
        {showChatConvo ? (
          <ChatMessageFeed
            texts={dummyText}
            backBtnClick={() => setSelectedSpecialist("")}
            setShowChatConvo={setShowChatConvo}
          />
        ) : (
          <div className="chat-init-right flex-grow-1">
            <p className="text-center w-100 fs-5 pt-5">Click any specialist to start chat.</p>
          </div>
        )}
      </div>
    );
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
          <ChatPanel />
        </Grid>
        <Grid item xs={12} className="video-section">
          <Paper className="video-container">
            <video ref={myVideo} className="video" autoPlay playsInline muted />
            <video ref={userVideo} className="video" autoPlay playsInline />
            {selectedParticipant && (
              <div className="video-controls">
                <Button variant="contained" color="primary" startIcon={<VideoCall />} onClick={startCall}>
                  Start Call
                </Button>
                <Button variant="contained" color="secondary" onClick={endCall}>
                  End Call
                </Button>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
