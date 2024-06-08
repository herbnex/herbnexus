import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, ListGroup, Form, Button, Badge } from "react-bootstrap";
import { ref, set, onValue, push } from "firebase/database";
import { database, db } from "../../../Firebase/firebase.config";
import { doc, getDocs, collection, query, where, getDoc } from "firebase/firestore";
import useAuth from "../../../hooks/useAuth";
import { generateChatId } from "../../../utils/generateChatId";
import "./Contact.css";

const CustomAvatar = ({ name, imgUrl }) => {
  const nameParts = name?.split(" ");
  const initials = nameParts?.map((part) => part?.charAt(0).toUpperCase())?.join("");

  return (
    <div className="custom-avatar-profile rounded-pill fs-6 bg-primary overflow-hidden text-white">
      {imgUrl ? <img src={imgUrl} alt={"user profile"} className="object-fit-cover w-100 h-100" /> : initials}
    </div>
  );
};

const Contact = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    if (!user || !selectedParticipant) {
      return;
    }

    const chatId = isDoctor
      ? generateChatId(selectedParticipant.id, user.displayName)
      : generateChatId(user.uid, selectedParticipant.name);

    console.log("Generated Chat ID:", chatId);
    const chatRef = ref(database, `chats/${chatId}/messages`);
    const typingRef = ref(database, `chats/${chatId}/typing`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        console.log("Fetched messages:", messages);
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

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
    setShowChatConvo(true);

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
              <CustomAvatar name={selectedParticipant?.name || "john doe"} />
              <div className="d-flex flex-column">
                <span className="chat-regular-text chat-user-name">{selectedParticipant?.name || "John Doe"}</span>
                <span className="chat-small-text">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 pb-5 h-auto">
          <div className="chat-convo-section">
            {msgList?.map((msg, index) => (
              <div key={index} className={`message-container ${msg.userId === user.uid ? "msg-self" : "msg-other"} ${visibleTimestamps[index] ? "show-timestamp" : ""}`}
                onClick={() => toggleTimestamp(index)}>
                <p className="chat-message-text chat-regular-text p-2 rounded-3 my-3" title={msg.user}>{msg.text}</p>
                {visibleTimestamps[index] && (
                  <span className={`timestamp ${msg.userId === user.uid ? "timestamp-left" : "timestamp-right"}`}>
                    {formatTimestamp(msg.timestamp)}
                  </span>
                )}
              </div>
            ))}
            {otherTyping && (
              <p className="msg-other typing-indicator">
                Typing...
              </p>
            )}
          </div>

          <div className="mt-auto pt-4">
            <div className="d-flex gap-2 chat-text-field-box">
              <Form.Group className="flex-grow-1">
                <Form.Control
                  as="textarea"
                  ref={textareaRef}
                  rows={1}
                  placeholder="Type your message..."
                  value={message}
                  onChange={handleTyping}
                  aria-label="User message input"
                  className="message-input"
                  style={{ resize: 'none', overflow: 'auto' }}
                />
              </Form.Group>
              <Button variant="info" className="text-white rounded-circle" onClick={handleSendMessage}>
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

  const ChatUserItem = ({ participant, isDoctor, handleClick, selectedParticipant }) => {
    return (
      <ListGroup.Item
        key={`${isDoctor ? "user" : "doctor"}-${participant.id}`}
        active={selectedParticipant && selectedParticipant.id === participant.id}
        onClick={() => handleClick(participant)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>{participant.name}</h5>
            <p>{isDoctor ? participant.email : participant.speciality}</p>
          </div>
          <Badge bg="success">Online</Badge>
        </div>
      </ListGroup.Item>
    );
  };

  const ChatUserFeed = ({ setShowChatConvo, selectedParticipant, handleParticipantClick }) => {
    const [showSearch, setShowSearch] = useState(false);

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
            {(isDoctor ? activeUsers : onlineDoctors).map((participant) => (
              <ChatUserItem
                key={participant.id}
                participant={participant}
                isDoctor={isDoctor}
                handleClick={handleParticipantClick}
                selectedParticipant={selectedParticipant}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container fluid className="chat-room">
      <Row>
        <Col md={4} className="participants-list">
          <ChatUserFeed
            setShowChatConvo={setShowChatConvo}
            selectedParticipant={selectedParticipant}
            handleParticipantClick={handleParticipantClick}
          />
        </Col>
        <Col md={8} className="chat-section" ref={chatSectionRef}>
          {showChatConvo ? (
            <ChatMessageFeed
              texts={msgList}
              setShowChatConvo={setShowChatConvo}
              backBtnClick={() => setSelectedParticipant(null)}
            />
          ) : (
            <div className="chat-init-right flex-grow-1">
              <p className="text-center w-100 fs-5 pt-5">Click any specialist to start chat.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
