import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, ListGroup, Form, Button, InputGroup, Badge, Spinner, Alert } from "react-bootstrap";
import { ref, set, onValue, push, update } from "firebase/database";
import { database, db } from "../../../Firebase/firebase.config";
import { doc, getDocs, collection, query, where, getDoc } from "firebase/firestore";
import useAuth from "../../../hooks/useAuth";
import { generateChatId } from "../../../utils/generateChatId";
import { useHistory, useLocation } from "react-router-dom";
import SimplePeer from "simple-peer";
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
  const { user, updateUser } = useAuth();
  const history = useHistory();
  const location = useLocation();
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
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

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
    setOnlineDoctors(doctors);
  };

  const fetchActiveUsers = async () => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setActiveUsers(users);
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
    }, 3000);
  };

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
    setShowChatConvo(true);

    const chatId = isDoctor
      ? generateChatId(participant.id, user.displayName)
      : generateChatId(user.uid, participant.name);

    const chatRef = ref(database, `chats/${chatId}/messages`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        setMsgList(messages);
      } else {
        setMsgList([]);
      }
    });

    setTimeout(() => {
      const chatSection = chatSectionRef.current;
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const startCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;

      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      peer.on("signal", (data) => {
        const chatId = isDoctor
          ? generateChatId(selectedParticipant.id, user.displayName)
          : generateChatId(user.uid, selectedParticipant.name);

        const callRef = ref(database, `calls/${chatId}`);
        set(callRef, data);
      });

      peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      });

      const chatId = isDoctor
        ? generateChatId(selectedParticipant.id, user.displayName)
        : generateChatId(user.uid, selectedParticipant.name);

      const callRef = ref(database, `calls/${chatId}`);
      onValue(callRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          peer.signal(data);
        }
      });

      setPeer(peer);
    });
  };

  const joinCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;

      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: stream,
      });

      const chatId = isDoctor
        ? generateChatId(selectedParticipant.id, user.displayName)
        : generateChatId(user.uid, selectedParticipant.name);

      const callRef = ref(database, `calls/${chatId}`);
      onValue(callRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          peer.signal(data);
        }
      });

      peer.on("signal", (data) => {
        update(callRef, data);
      });

      peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      });

      connectionRef.current = peer;
      setPeer(peer);
    });
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
              }}
            >
              <i className="bi bi-arrow-left-circle"></i>
            </div>
            <div className="d-flex h-100 gap-2 align-items-center">
              <CustomAvatar name={"John Doe"} />
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
                <Form.Control
                  className="h-100 rounded-pill"
                  placeholder="Type your message..."
                  value={message}
                  onChange={handleTyping}
                  ref={textareaRef}
                />
              </Form.Group>
              <Button variant="info" className="text-white rounded-circle" onClick={handleSendMessage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                </svg>
              </Button>
            </div>
          </div>
          <div className="video-container">
            <video playsInline muted ref={myVideo} autoPlay className="video" />
            <video playsInline ref={userVideo} autoPlay className="video" />
          </div>
          <div className="call-buttons">
            <Button onClick={startCall}>Start Call</Button>
            <Button onClick={joinCall}>Join Call</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container fluid className="chat-room">
      <Row>
        <Col md={4} className="participants-list">
          <h3>{isDoctor ? "Users" : "Online Doctors"}</h3>
          <ListGroup>
            {(isDoctor ? activeUsers : onlineDoctors).map((participant) => (
              <ListGroup.Item
                key={`${isDoctor ? "user" : "doctor"}-${participant.id}`}
                active={selectedParticipant && selectedParticipant.id === participant.id}
                onClick={() => handleParticipantClick(participant)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{participant.name}</h5>
                    <p>{isDoctor ? participant.email : participant.speciality}</p>
                  </div>
                  <Badge bg="success">Online</Badge>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8} className="chat-section" ref={chatSectionRef}>
          <div className="d-flex chat-panel chat-regular-text border-top">
            <div className="flex-shrink-0 border-end h-100 chat-user-feed bg-light pb-5">
              <div className="">
                <div className="border-bottom px-3 chat-title-box d-flex justify-content-between align-items-center">
                  <span className="chat-panel-title">Messages</span>
                  <span className="chat-panel-title-search">
                    <i className="bi bi-search"></i>
                  </span>
                </div>
                <div className="px-3 mt-2">
                  <Form.Control type="text" className="border-0" placeholder="Search here..." autoFocus />
                </div>
              </div>
              <div className="mt-4 px-2 ">
                <div className="d-flex flex-column gap-3">
                  {activeUsers.map((participant) => (
                    <div
                      key={participant.id}
                      className="d-flex chat-user-item align-items-center gap-2 bg-white p-3 rounded-3"
                      onClick={() => handleParticipantClick(participant)}
                    >
                      <CustomAvatar name={participant.name} imgUrl={participant.imgUrl} />
                      <div className="d-flex flex-shrink-0 flex-column">
                        <span className="chat-user-name">{participant.name}</span>
                        <span className="chat-small-text">{participant.speciality}</span>
                      </div>
                      <span className="ms-auto chat-small-text">
                        <span className="chat-online-indicator me-1"></span>online
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {showChatConvo ? (
              <ChatMessageFeed
                texts={msgList}
                backBtnClick={() => setSelectedParticipant(null)}
                setShowChatConvo={setShowChatConvo}
              />
            ) : (
              <div className="chat-init-right flex-grow-1">
                <p className="text-center w-100 fs-5 pt-5">Click any specialist to start chat.</p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
