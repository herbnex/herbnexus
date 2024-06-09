import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, ListGroup, Form, Button, InputGroup, Badge } from "react-bootstrap";
import Peer from 'peerjs';
import { ref, set, onValue, push } from "firebase/database";
import { database, db } from "../../../Firebase/firebase.config";
import { doc, getDocs, collection, query, where, getDoc, setDoc } from "firebase/firestore";
import useAuth from "../../../hooks/useAuth";
import { generateChatId } from "../../../utils/generateChatId";
import { useHistory, useLocation } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const { user, updateUser } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const [message, setMessage] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const msgBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const chatSectionRef = useRef(null);
  const [visibleTimestamps, setVisibleTimestamps] = useState({});
  const [peerId, setPeerId] = useState(null);
  const [call, setCall] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer({
      host: 'peerjs-server.herokuapp.com',
      secure: true,
      port: 443,
    });

    peer.on('open', async (id) => {
      setPeerId(id);
      const userRef = doc(db, isDoctor ? "doctors" : "users", user.uid);
      await setDoc(userRef, { peerId: id }, { merge: true });
    });

    peer.on('call', (incomingCall) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        incomingCall.answer(stream);
        setCall(incomingCall);
        localVideoRef.current.srcObject = stream;
        incomingCall.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
        });
      });
    });

    peerInstance.current = peer;
  }, [isDoctor, user]);

  const startCall = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      const call = peerInstance.current.call(remotePeerId, stream);
      setCall(call);
      localVideoRef.current.srcObject = stream;
      call.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream);
      });
    });
  };

  const endCall = () => {
    call.close();
    setCall(null);
    setRemoteStream(null);
  };

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
    const doctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched online doctors:", doctors);

    const uniqueDoctors = doctors.filter((doctor, index, self) =>
      index === self.findIndex((d) => d.id === doctor.id)
    );

    setOnlineDoctors(uniqueDoctors);
  };

  const fetchActiveUsers = async () => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched active users:", users);

    const uniqueUsers = users.filter((user, index, self) =>
      index === self.findIndex((u) => u.id === user.id)
    );

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
      timestamp: new Date().toISOString()
    };

    const chatId = isDoctor
      ? generateChatId(selectedParticipant.id, user.displayName)
      : generateChatId(user.uid, selectedParticipant.name);

    const chatRef = ref(database, `chats/${chatId}/messages`);
    const newMessageRef = push(chatRef);

    await set(newMessageRef, newMessage);
    setMessage('');
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
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const resetTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.value = '';
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

  const handleParticipantClick = async (participant) => {
    if (!participant.peerId) {
      const peer = new Peer({
        host: 'peerjs-server.herokuapp.com',
        secure: true,
        port: 443,
      });

      peer.on('open', async (id) => {
        participant.peerId = id;
        const participantRef = doc(db, isDoctor ? "users" : "doctors", participant.id);
        await setDoc(participantRef, { peerId: id }, { merge: true });
      });

      peerInstance.current = peer;
    }

    setSelectedParticipant(participant);

    setTimeout(() => {
      const chatSection = chatSectionRef.current;
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <Container fluid className="chat-room">
      <Row>
        <Col md={4} className="participants-list">
          <h3>{isDoctor ? "Users" : "Online Doctors"}</h3>
          <ListGroup>
            {(isDoctor ? activeUsers : onlineDoctors).map(participant => (
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
          {selectedParticipant ? (
            <>
              <h4>Chat with {selectedParticipant.name}</h4>
              <div className="msg-box" ref={msgBoxRef}>
                {msgList.map((msg, index) => (
                  <div
                    key={index}
                    className={`message-container ${msg.userId === user.uid ? "msg-self" : "msg-other"} ${visibleTimestamps[index] ? "show-timestamp" : ""}`}
                    onClick={() => toggleTimestamp(index)}
                  >
                    <p title={msg.user}>{msg.text}</p>
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
              <Form onSubmit={handleSendMessage} className="message-input-container">
                <InputGroup className="mb-3">
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
                  <Button variant="outline-secondary" type="submit" className="message-send-button">Send</Button>
                </InputGroup>
              </Form>
              <div className="video-call-container">
                <video ref={localVideoRef} autoPlay muted className="local-video"></video>
                <video ref={remoteVideoRef} autoPlay className="remote-video" srcObject={remoteStream}></video>
                {call ? (
                  <Button onClick={endCall}>End Call</Button>
                ) : (
                  <Button onClick={() => startCall(selectedParticipant.peerId)}>Start Call</Button>
                )}
              </div>
            </>
          ) : (
            <h4>Select a {isDoctor ? "user" : "doctor"} to start chatting</h4>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
