import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const [message, setMessage] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [showIncomingCallModal, setShowIncomingCallModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(null);
  const [language, setLanguage] = useState('en'); // For internationalization

  return (
    <ChatContext.Provider
      value={{
        onlineDoctors,
        setOnlineDoctors,
        activeUsers,
        setActiveUsers,
        selectedParticipant,
        setSelectedParticipant,
        msgList,
        setMsgList,
        message,
        setMessage,
        isDoctor,
        setIsDoctor,
        otherTyping,
        setOtherTyping,
        incomingCall,
        setIncomingCall,
        showIncomingCallModal,
        setShowIncomingCallModal,
        showCallModal,
        setShowCallModal,
        currentRoom,
        setCurrentRoom,
        isMuted,
        setIsMuted,
        isCameraOff,
        setIsCameraOff,
        isScreenSharing,
        setIsScreenSharing,
        loading,
        setLoading,
        error,
        setError,
        showNotification,
        setShowNotification,
        notification,
        setNotification,
        language,
        setLanguage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
