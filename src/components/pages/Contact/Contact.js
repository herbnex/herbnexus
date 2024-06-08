import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, Button, Paper, TextField } from "@material-ui/core";
import { FormControl, InputLabel, Input, Badge } from "@material-ui/core";
import useAuth from "../../../hooks/useAuth";
import { database, db } from "../../../Firebase/firebase.config";
import { ref, set, onValue, push } from "firebase/database";
import { doc, getDocs, collection, query, where, getDoc } from "firebase/firestore";
import "./Contact.css";

// Helper functions
const generateChatId = (id1, id2) => {
  return [id1, id2].sort().join("-");
};

const dummyText = [
  {
    user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
    user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
  },
  // Add more dummy text objects as needed
];

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
  const [visibleTimestamps, setVisibleTimestamps] = useState({});
  const [otherTyping, setOtherTyping] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const chatSectionRef = useRef(null);
  const msgBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!user) return;

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

    // Deduplicate users
    const uniqueUsers = users.filter((user, index, self) => index === self.findIndex((u) => u.id === user.id));

    setActiveUsers(uniqueUsers);
  };

  useEffect(() => {
    if (!user || !selectedParticipant) {
      return;
    }

    const chatId = isDoctor
      ? generateChatId(selectedParticipant.id, user.displayName)
      : generateChatId(user.uid, selectedParticipant.name);

    const chatRef = ref(database, `chats/${chatId}/messages`);
    const typingRef = ref(database, `chats/${chatId}/typing`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        setMsgList(messages);
        // Scroll to the bottom when new messages arrive
        setTimeout(() => {
          if (msgBoxRef.current) {
            msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
          }
        }, 100);
      } else {
        setMsgList([]);
      }
    });

    const typingUnsubscribe = onValue(typingRef, (snapshot) => {
      const typingData = snapshot.val();
      setOtherTyping(typingData && typingData.typing && typingData.typing !== user.uid);
    });

    return () => {
      unsubscribe();
      typingUnsubscribe();
    };
  }, [user, selectedParticipant, isDoctor]);

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

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
    setShowChatConvo(true);
    setSelectedSpecialist(participant.id);
    // Scroll to the chat section on small screens
    setTimeout(() => {
      const chatSection = chatSectionRef.current;
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Delay to ensure layout has updated
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
              <div className="custom-avatar-profile rounded-pill fs-6 bg-primary overflow-hidden text-white">
                JD
              </div>
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
              <FormControl className="flex-grow-1">
                <TextField className="h-100 rounded-pill" placeholder="Type your message..." />
              </FormControl>
              <Button variant="contained" color="primary" className="rounded-circle">
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
    const nameParts = name?.split(" ");
    const initials = nameParts?.map((part) => part?.charAt(0).toUpperCase())?.join("");

    return (
      <div
        className={`d-flex chat-user-item align-items-center gap-2 bg-white p-3 rounded-3 ${
          selectedSpecialist && selectedSpecialist === "eg" ? "border border-primary border-2 opacity-75" : ""
        }`}
        onClick={handleClick}>
        <div className="custom-avatar-profile rounded-pill fs-6 bg-primary overflow-hidden text-white">
          {imgUrl ? <img src={imgUrl} alt={"user profile"} className="object-fit-cover w-100 h-100" /> : initials}
        </div>
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
              <TextField
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
        <Grid item md={4} className="participants-list">
          <Typography variant="h3">{isDoctor ? "Users" : "Online Doctors"}</Typography>
          <List>
            {(isDoctor ? activeUsers : onlineDoctors).map((participant) => (
              <ListItem
                key={`${isDoctor ? "user" : "doctor"}-${participant.id}`}
                button
                onClick={() => handleParticipantClick(participant)}
                selected={selectedParticipant && selectedParticipant.id === participant.id}
              >
                <ListItemAvatar>
                  <div className="custom-avatar-profile rounded-pill fs-6 bg-primary overflow-hidden text-white">
                    {participant.imgUrl ? <img src={participant.imgUrl} alt={"user profile"} className="object-fit-cover w-100 h-100" /> : participant.name.charAt(0).toUpperCase()}
                  </div>
                </ListItemAvatar>
                <ListItemText
                  primary={participant.name}
                  secondary={isDoctor ? participant.email : participant.speciality}
                />
                <Badge color="primary" variant="dot">
                  Online
                </Badge>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item md={8} className="chat-section" ref={chatSectionRef}>
          <ChatPanel />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
