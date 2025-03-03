import React, { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col, ListGroup, Form, Button, InputGroup, Badge, Modal, Spinner, Alert, Toast, ToastContainer, Dropdown } from "react-bootstrap";
import { ref as databaseRef, set, onValue, push } from "firebase/database";
import { db, database, storage } from "../../../Firebase/firebase.config"; // Import storage
import { doc, getDocs, collection, query, where, getDoc, setDoc, onSnapshot, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import upload functions
import useAuth from "../../../hooks/useAuth";
import { generateChatId } from "../../../utils/generateChatId";
import { useHistory, useLocation } from "react-router-dom";
import { FaPhoneAlt, FaVideo, FaEllipsisV, FaGlobe, FaMicrophoneSlash, FaMicrophone, FaVideoSlash, FaDesktop, FaPaperclip, FaSmile, FaFileAlt } from "react-icons/fa";
import { ChatContext } from './ChatContext'; // Import the context
import EmojiPicker from 'emoji-picker-react'; // Import Emoji Picker
import "./Contact.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: 'pointer' }}
  >
    {children}
  </div>
));

const Contact = () => {
  const { user } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const {
    onlineDoctors, setOnlineDoctors,
    activeUsers, setActiveUsers,
    selectedParticipant, setSelectedParticipant,
    msgList, setMsgList,
    message, setMessage,
    isDoctor, setIsDoctor,
    otherTyping, setOtherTyping,
    incomingCall, setIncomingCall,
    showIncomingCallModal, setShowIncomingCallModal,
    showCallModal, setShowCallModal,
    currentRoom, setCurrentRoom,
    isMuted, setIsMuted,
    isCameraOff, setIsCameraOff,
    isScreenSharing, setIsScreenSharing,
    loading, setLoading,
    error, setError,
    showNotification, setShowNotification,
    notification, setNotification,
    language, setLanguage
  } = useContext(ChatContext);

  const typingTimeoutRef = useRef(null);
  const msgBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const chatSectionRef = useRef(null);
  const [visibleTimestamps, setVisibleTimestamps] = useState({});
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(new MediaStream());
  const screenStream = useRef(null);
  const roomIdRef = useRef(null);
  const pendingCandidates = useRef([]);
  const sessionId = useRef(null); // New session ID
  // (Removed initialLoad state for Safari fix.)
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for emoji picker
  const [downloadModal, setDownloadModal] = useState({ show: false, fileUrl: '', fileName: '' }); // State for download modal

  const configuration = {
    iceServers: [
      {
        urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
      },
    ],
    iceCandidatePoolSize: 2,
  };

  useEffect(() => {
    const checkIfDoctor = async () => {
      try {
        const userDocRef = doc(db, "doctors", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setIsDoctor(true);
        } else {
          setIsDoctor(false);
        }
      } catch (error) {
        //console.error("Error checking doctor status:", error);
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
    try {
      const doctorsRef = collection(db, "doctors");
      const q = query(doctorsRef, where("isOnline", "==", true));
      const querySnapshot = await getDocs(q);
      const doctors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const uniqueDoctors = doctors.filter(
        (doctor, index, self) =>
          index === self.findIndex((d) => d.id === doctor.id)
      );

      setOnlineDoctors(uniqueDoctors);
    } catch (error) {
      //console.error("Error fetching online doctors:", error);
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const uniqueUsers = users.filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.id === user.id)
      );

      setActiveUsers(uniqueUsers);
    } catch (error) {
      //console.error("Error fetching active users:", error);
    }
  };

  useEffect(() => {
    if (user && selectedParticipant) {
      roomIdRef.current = generateRoomId(selectedParticipant.id, user.uid);
      sessionId.current = roomIdRef.current; // Set session ID

      const chatId = isDoctor
        ? generateChatId(selectedParticipant.id, user.uid)
        : generateChatId(user.uid, selectedParticipant.id);

      const chatRef = databaseRef(database, `chats/${chatId}/messages`);
      const typingRef = databaseRef(database, `chats/${chatId}/typing`);

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
        setOtherTyping(
          typingData && typingData.typing && typingData.typing !== user.uid
        );
      });

      return () => {
        unsubscribe();
        typingUnsubscribe();
      };
    }
  }, [user, selectedParticipant, isDoctor, currentRoom]);

  // Updated Incoming Call Listener for Safari:
  // Instead of relying on sessionId and initialLoad, we now check the call's timestamp.
  useEffect(() => {
    const handleIncomingCalls = (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const callData = change.doc.data();
          if (callData.receiverId === user.uid && callData.callerId !== user.uid) {
            const callTime = new Date(callData.timestamp);
            const now = new Date();
            // Only trigger if the call was initiated within the last 30 seconds
            if (now - callTime < 30000) {
              setIncomingCall(callData);
              setShowIncomingCallModal(true);
            }
          }
        }
      });
    };

    const callUnsubscribe = onSnapshot(collection(db, `calls`), handleIncomingCalls);

    return () => {
      callUnsubscribe();
    };
  }, [user.uid]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedParticipant) {
      return;
    }

    try {
      const senderType = isDoctor ? "doctor" : "user";
      const userEmail = isDoctor ? selectedParticipant.email : user.email;
      const doctorEmail = isDoctor ? user.email : selectedParticipant.email;
      const newMessage = {
        user: user.displayName || "Anonymous",
        userId: user.uid,
        userEmail: userEmail, // Add user email
        doctorEmail: doctorEmail,
        text: message,
        timestamp: new Date().toISOString(),
      };

      const chatId = isDoctor
        ? generateChatId(selectedParticipant.id, user.uid)
        : generateChatId(user.uid, selectedParticipant.id);

      const chatRef = databaseRef(database, `chats/${chatId}/messages`);
      const newMessageRef = push(chatRef);

      await set(newMessageRef, newMessage);
      setMessage("");
      resetTextarea();

      await set(databaseRef(database, `chats/${chatId}/typing`), { typing: false });

      const formattedMessage =
        senderType === "doctor"
          ? `You have received a new message from ${newMessage.doctorEmail}: ${newMessage.text}`
          : `You have received a new message from ${newMessage.userEmail}: ${newMessage.text}`;

      // Send email notification
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: newMessage.userEmail,
          doctorEmail: newMessage.doctorEmail,
          subject: "New Message Notification",
          message: formattedMessage,
          senderType: senderType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from email function:", errorData);
      }
      setTimeout(() => {
        if (msgBoxRef.current) {
          msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
        }
      }, 100);
    } catch (error) {
      //console.error("Error sending message:", error);
    }
  };

  const handleTyping = async (e) => {
    setMessage(e.target.value);

    const chatId = isDoctor
      ? generateChatId(selectedParticipant.id, user.uid)
      : generateChatId(user.uid, selectedParticipant.id);

    try {
      if (e.target.value.trim()) {
        await set(databaseRef(database, `chats/${chatId}/typing`), { typing: user.uid });

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(async () => {
          await set(databaseRef(database, `chats/${chatId}/typing`), { typing: false });
        }, 7000);
      } else {
        await set(databaseRef(database, `chats/${chatId}/typing`), { typing: false });
      }
    } catch (error) {
      //console.error("Error handling typing:", error);
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

    setTimeout(() => {
      const chatSection = chatSectionRef.current;
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);

    // Reset call-related states to avoid automatic calls
    setCurrentRoom(null);
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
  };

  // WebRTC Functions

  useEffect(() => {
    // Attach/detach streams when showCallModal changes
    if (showCallModal && localStream.current && remoteStream.current) {
      attachMediaStreams();
    } else {
      detachMediaStreams();
    }
  }, [showCallModal]);

  const attachMediaStreams = () => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream.current;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream.current;
    }
  };

  const detachMediaStreams = () => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const openUserMedia = async () => {
    setLoading(true);
    try {
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }
      remoteStream.current = new MediaStream();
    } catch (error) {
      //console.error("Error accessing user media:", error);
      setError("Error accessing user media");
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (!localStream.current) {
      await openUserMedia();
    }

    if (!roomIdRef.current) {
      roomIdRef.current = generateRoomId(selectedParticipant.id, user.uid);
      sessionId.current = roomIdRef.current; // Set session ID
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    peerConnection.current = new RTCPeerConnection(configuration);
    registerPeerConnectionListeners();

    localStream.current.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current);
    });

    const roomRef = doc(db, "rooms", roomIdRef.current);
    const callerCandidatesCollection = collection(roomRef, "callerCandidates");

    peerConnection.current.addEventListener("icecandidate", (event) => {
      if (!peerConnection.current || !event.candidate) return;
      addDoc(callerCandidatesCollection, event.candidate.toJSON());
    });

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    const roomWithOffer = {
      offer: { type: offer.type, sdp: offer.sdp },
      timestamp: new Date(),
      sessionId: sessionId.current, // Include session ID in room data
    };
    await setDoc(roomRef, roomWithOffer);

    setCurrentRoom(`Current room is ${roomRef.id} - You are the caller!`);

    peerConnection.current.addEventListener("track", (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.addTrack(track);
      });

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream.current;
      }
    });

    onSnapshot(roomRef, async (snapshot) => {
      const data = snapshot.data();
      if (data?.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        try {
          if (peerConnection.current.signalingState === "have-local-offer") {
            await peerConnection.current.setRemoteDescription(rtcSessionDescription);
            while (pendingCandidates.current.length > 0) {
              await peerConnection.current.addIceCandidate(pendingCandidates.current.shift());
            }
          }
        } catch (error) {
          //console.error("Error setting remote description:", error);
        }
      }
    });

    onSnapshot(collection(roomRef, "calleeCandidates"), (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          try {
            if (peerConnection.current?.remoteDescription) {
              await peerConnection.current.addIceCandidate(candidate);
            } else {
              pendingCandidates.current.push(candidate);
            }
          } catch (error) {
            //console.error("Error adding ICE candidate:", error);
          }
        }
      });
    });
  };

  const joinRoomById = async (roomId) => {
    if (!localStream.current) {
      await openUserMedia();
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    const roomRef = doc(db, "rooms", roomId);
    const roomSnapshot = await getDoc(roomRef);

    if (roomSnapshot.exists()) {
      peerConnection.current = new RTCPeerConnection(configuration);
      registerPeerConnectionListeners();

      localStream.current.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");
      peerConnection.current.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          addDoc(calleeCandidatesCollection, event.candidate.toJSON());
        }
      });

      peerConnection.current.addEventListener("track", (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.current.addTrack(track);
        });

        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream.current;
        }
      });

      const offer = roomSnapshot.data().offer;
      if (offer) {
        try {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);

          const roomWithAnswer = {
            answer: { type: answer.type, sdp: answer.sdp },
            sessionId: sessionId.current, // Include session ID
          };
          await updateDoc(roomRef, roomWithAnswer);

          onSnapshot(collection(roomRef, "callerCandidates"), (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
              if (change.type === "added") {
                const candidate = new RTCIceCandidate(change.doc.data());
                try {
                  if (peerConnection.current?.remoteDescription) {
                    await peerConnection.current.addIceCandidate(candidate);
                  } else {
                    pendingCandidates.current.push(candidate);
                  }
                } catch (error) {
                  //console.error("Error adding ICE candidate:", error);
                }
              }
            });
          });
        } catch (error) {
          //console.error("Error setting remote description or creating answer:", error);
        }
      }
    }
  };

  const hangUp = async () => {
    const tracks = localStream.current?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });

    if (remoteStream.current) {
      remoteStream.current.getTracks().forEach((track) => track.stop());
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    if (roomIdRef.current) {
      const roomRef = doc(db, "rooms", roomIdRef.current);
      const calleeCandidatesSnapshot = await getDocs(collection(roomRef, "calleeCandidates"));
      calleeCandidatesSnapshot.forEach(async (candidate) => {
        await deleteDoc(candidate.ref);
      });
      const callerCandidatesSnapshot = await getDocs(collection(roomRef, "callerCandidates"));
      callerCandidatesSnapshot.forEach(async (candidate) => {
        await deleteDoc(candidate.ref);
      });
      await deleteDoc(roomRef);
    }

    // Reset states
    roomIdRef.current = null;
    sessionId.current = null; // Reset session ID
    setIncomingCall(null);
    setShowIncomingCallModal(false);
    setShowCallModal(false);
    setIsMuted(false);
    setIsCameraOff(false);
    setIsScreenSharing(false);
    setError(null);

    // Close the modal without refreshing the page
    setCurrentRoom(null);
    localStream.current = null;
    remoteStream.current = new MediaStream();
  };

  const toggleMute = () => {
    const audioTrack = localStream.current
      .getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    const videoTrack = localStream.current
      .getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOff(!videoTrack.enabled);
    }
  };

  const startScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        screenStream.current = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const screenTrack = screenStream.current.getTracks()[0];

        const sender = peerConnection.current
          .getSenders()
          .find((s) => s.track.kind === "video");
        sender.replaceTrack(screenTrack);

        screenTrack.onended = () => {
          stopScreenShare();
        };

        setIsScreenSharing(true);
      } catch (error) {
        //console.error("Error starting screen share:", error);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    const videoTrack = localStream.current
      .getTracks()
      .find((track) => track.kind === "video");

    const sender = peerConnection.current
      .getSenders()
      .find((s) => s.track.kind === "video");
    sender.replaceTrack(videoTrack);

    setIsScreenSharing(false);
  };

  const registerPeerConnectionListeners = () => {
    if (!peerConnection.current) return;

    peerConnection.current.addEventListener("icegatheringstatechange", () => {
      // console.log(`ICE gathering state changed: ${peerConnection.current.iceGatheringState}`);
    });

    peerConnection.current.addEventListener("connectionstatechange", () => {
      // console.log(`Connection state change: ${peerConnection.current.connectionState}`);
      if (peerConnection.current.connectionState === "disconnected" ||
          peerConnection.current.connectionState === "failed" ||
          peerConnection.current.connectionState === "closed") {
        hangUp();
      }
    });

    peerConnection.current.addEventListener("signalingstatechange", () => {
      // console.log(`Signaling state change: ${peerConnection.current.signalingState}`);
    });

    peerConnection.current.addEventListener("iceconnectionstatechange", () => {
      // console.log(`ICE connection state change: ${peerConnection.current.iceConnectionState}`);
      if (peerConnection.current.iceConnectionState === "disconnected" ||
          peerConnection.current.iceConnectionState === "failed" ||
          peerConnection.current.iceConnectionState === "closed") {
        hangUp();
      }
    });

    peerConnection.current.addEventListener("track", (event) => {
      const [remoteTrack] = event.streams[0].getTracks();
      remoteStream.current.addTrack(remoteTrack);

      // Attach streams ONLY after remote track is added
      if (showCallModal && localStream.current && remoteStream.current) {
        attachMediaStreams();
      }
    });
  };

  const handleCall = async () => {
    if (!selectedParticipant) return;

    // Reset states before making a new call
    setCurrentRoom(null);
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    localStream.current = null;
    remoteStream.current = new MediaStream();

    roomIdRef.current = generateRoomId(selectedParticipant.id, user.uid); // Ensure roomId is set
    sessionId.current = roomIdRef.current; // Set session ID
    await createRoom();
    setShowCallModal(true);

    const callData = {
      callerId: user.uid,
      callerName: user.displayName || "Anonymous",
      receiverId: selectedParticipant.id,
      roomId: roomIdRef.current,
      sessionId: sessionId.current, // Include session ID
      timestamp: new Date().toISOString(),
    };

    // console.log('Call data being sent:', callData); // Log call data for debugging
    await addDoc(collection(db, "calls"), callData);
  };

  const generateRoomId = (doctorId, userId) => {
    const ids = [doctorId, userId].sort(); // Ensure the room ID is the same regardless of the order
    return `${ids[0]}_${ids[1]}`;
  };

  const answerCall = async () => {
    setShowIncomingCallModal(false);
    setShowCallModal(true);
    if (incomingCall) {
      roomIdRef.current = incomingCall.roomId;
      sessionId.current = incomingCall.sessionId; // Set session ID
      await joinRoomById(incomingCall.roomId);
    }
    setIncomingCall(null);
  };

  const declineCall = () => {
    setShowIncomingCallModal(false);
    setIncomingCall(null);
  };

  // Helper Functions

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const showError = (error) => {
    setError(error);
    setTimeout(() => setError(null), 5000);
  };

  const handleNotification = (message) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  // Filter participants based on the search query
  const filteredParticipants = (isDoctor ? activeUsers : onlineDoctors).filter(participant =>
    participant.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmojiClick = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageReference = storageRef(storage, `chat-files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: handle upload progress
        },
        (error) => {
         // console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newMessage = {
              user: user.displayName || "Anonymous",
              userId: user.uid,
              fileName: file.name,
              fileType: file.type,
              fileUrl: downloadURL,
              timestamp: new Date().toISOString(),
            };

            const chatId = isDoctor
              ? generateChatId(selectedParticipant.id, user.uid)
              : generateChatId(user.uid, selectedParticipant.id);

            const chatRef = databaseRef(database, `chats/${chatId}/messages`);
            const newMessageRef = push(chatRef);

            set(newMessageRef, newMessage).then(() => {
              setMessage("");
              resetTextarea();
            });

            setTimeout(() => {
              if (msgBoxRef.current) {
                msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
              }
            }, 100);
          });
        }
      );
    }
  };

  const handleFileDownload = (fileUrl, fileName) => {
    setDownloadModal({ show: true, fileUrl, fileName });
  };

  const renderMessage = (msg) => {
    if (msg.fileUrl) {
      const fileTypeIcon = (type) => {
        if (type.startsWith("image/")) return <FaFileAlt />;
        if (type.startsWith("video/")) return <FaFileAlt />;
        if (type.startsWith("audio/")) return <FaFileAlt />;
        return <FaFileAlt />;
      };

      return (
        <div onClick={() => handleFileDownload(msg.fileUrl, msg.fileName)} style={{ cursor: 'pointer' }}>
          {fileTypeIcon(msg.fileType)}
          <span style={{ marginLeft: '10px' }}>{msg.fileName}</span>
        </div>
      );
    } else {
      return <p title={msg.user}>{msg.text}</p>;
    }
  };

  const downloadFile = () => {
    const filePath = decodeURIComponent(new URL(downloadModal.fileUrl).pathname.split('/o/')[1].split('?alt=media')[0]);
    fetch(`https://us-central1-health-de695.cloudfunctions.net/getDownloadUrl?filePath=${encodeURIComponent(filePath)}`)
      .then(response => response.json())
      .then(data => {
        const url = data.url;
        const link = document.createElement('a');
        link.href = url;
        link.download = downloadModal.fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadModal({ show: false, fileUrl: '', fileName: '' });
      });
  };

  return (
    <Container fluid className="chat-room">
      <Row>
        <Col md={4} className="participants-list">
          <div className="title-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>{isDoctor ? "Users" : "Online Doctors"}</h3>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  <FaGlobe /> {language}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleLanguageChange('en')}>English</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('es')}>Spanish</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('fr')}>French</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('de')}>German</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <InputGroup className="mb-3 search-container">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </div>
          <ListGroup>
            {filteredParticipants.map((participant) => (
              <ListGroup.Item
                key={`${isDoctor ? "user" : "doctor"}-${participant.id}`}
                active={
                  selectedParticipant && selectedParticipant.id === participant.id
                }
                onClick={() => handleParticipantClick(participant)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={participant.photoURL || "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"}
                      alt="Avatar"
                      className="rounded-circle me-2"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <div>
                      <h5>{participant.name || "No Name"}</h5>
                      <p>{isDoctor ? participant.email : participant.speciality}</p>
                    </div>
                  </div>
                  <Badge bg="success" >Online</Badge>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8} className="chat-section" ref={chatSectionRef}>
          {selectedParticipant ? (
            <>
              <div className="chat-top-bar d-flex justify-content-between align-items-center p-2 bg-light">
                <div className="d-flex align-items-center">
                  <div className="user-avatar bg-secondary rounded-circle me-2" style={{ width: '40px', height: '40px' }}>
                    <img
                      src={selectedParticipant.photoURL || "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"}
                      alt="Avatar"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    />
                  </div>
                  <span>{selectedParticipant.name}</span>
                </div>
                <div className="chat-icons">
                  <FaVideo className="me-2" style={{ cursor: 'pointer' }} onClick={handleCall} />
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-ellipsis">
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => history.push(`/doctor/${selectedParticipant.id}`)}>View Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => history.push('/dashboard')}>Settings</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="msg-box" ref={msgBoxRef}>
                {msgList.map((msg, index) => (
                  <div
                    key={index}
                    className={`message-container ${
                      msg.userId === user.uid ? "msg-self" : "msg-other"
                    } ${visibleTimestamps[index] ? "show-timestamp" : ""}`}
                    onClick={() => toggleTimestamp(index)}
                  >
                    {renderMessage(msg)}
                    {visibleTimestamps[index] && (
                      <span
                        className={`timestamp ${
                          msg.userId === user.uid
                            ? "timestamp-left"
                            : "timestamp-right"
                        }`}
                      >
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    )}
                  </div>
                ))}
                {otherTyping && (
                  <p className="msg-other typing-indicator">Typing...</p>
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
                    style={{ resize: "none", overflow: "auto" }}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowEmojiPicker(val => !val)} className="message-icon-button">
                    <FaSmile />
                  </Button>
                  <Form.Control
                    type="file"
                    style={{ display: "none" }}
                    id="file-input"
                    onChange={handleFileChange}
                  />
                  <Button variant="outline-secondary" onClick={() => document.getElementById("file-input").click()} className="message-icon-button">
                    <FaPaperclip />
                  </Button>
                  <Button variant="outline-secondary" type="submit" className="message-send-button">
                    Send
                  </Button>
                </InputGroup>
                {showEmojiPicker && (
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                )}
              </Form>
              <Modal
                show={showCallModal}
                onHide={() => setShowCallModal(false)}
                size="lg"
                backdrop="static" // Prevent modal from closing by clicking outside
                keyboard={false} // Prevent modal from closing by pressing Esc
              >
                <Modal.Header>
                  <Modal.Title>Video Call</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md={12} className="d-flex flex-column align-items-center video-container">
                      {showCallModal && (
                        <>
                          <div className="video-label">You ({user.displayName || "Anonymous"})</div>
                          <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            playsInline
                            className="local-video"
                            id="localVideo"
                          />
                          <div className="video-label">{selectedParticipant.name}</div>
                          <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="remote-video"
                            id="remoteVideo"
                          />
                        </>
                      )}
                      <div className="video-call-controls">
                        <Button onClick={toggleMute} className="control-button">
                          {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                        </Button>
                        <Button onClick={toggleCamera} className="control-button">
                          {isCameraOff ? <FaVideoSlash /> : <FaVideo />}
                        </Button>
                        <Button onClick={startScreenShare} className="control-button">
                          <FaDesktop />
                        </Button>
                      </div>
                    </Col>
                    <Col md={12} className="chat-section">
                      <div className="msg-box" ref={msgBoxRef}>
                        {msgList.map((msg, index) => (
                          <div
                            key={index}
                            className={`message-container ${msg.userId === user.uid ? "msg-self" : "msg-other"} ${visibleTimestamps[index] ? "show-timestamp" : ""}`}
                            onClick={() => toggleTimestamp(index)}
                          >
                            {renderMessage(msg)}
                            {visibleTimestamps[index] && (
                              <span className={`timestamp ${msg.userId === user.uid ? "timestamp-left" : "timestamp-right"}`}>
                                {formatTimestamp(msg.timestamp)}
                              </span>
                            )}
                          </div>
                        ))}
                        {otherTyping && (
                          <p className="msg-other typing-indicator">Typing...</p>
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
                            style={{ resize: "none", overflow: "auto" }}
                          />
                          <Button variant="outline-secondary" type="submit" className="message-send-button">
                            Send
                          </Button>
                        </InputGroup>
                      </Form>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={hangUp}>
                    Hang Up
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <h4>Select a {isDoctor ? "user" : "doctor"} to start chatting</h4>
          )}
        </Col>
      </Row>
      {incomingCall && showIncomingCallModal && (
        <Modal show={showIncomingCallModal} onHide={declineCall}>
          <Modal.Header closeButton>
            <Modal.Title>Incoming Call</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{incomingCall.callerName} is calling you.</p>
            <Button variant="success" onClick={answerCall}>
              Answer
            </Button>
            <Button variant="danger" onClick={declineCall}>
              Decline
            </Button>
          </Modal.Body>
        </Modal>
      )}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowNotification(false)} show={showNotification} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>{notification}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={downloadModal.show} onHide={() => setDownloadModal({ show: false, fileUrl: '', fileName: '' })}>
        <Modal.Header closeButton>
          <Modal.Title>Download File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to download the file: {downloadModal.fileName}?</p>
          <Button variant="success" onClick={downloadFile}>
            Yes
          </Button>
          <Button variant="danger" onClick={() => setDownloadModal({ show: false, fileUrl: '', fileName: '' })}>
            No
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Contact;
