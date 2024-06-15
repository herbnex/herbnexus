// src/contexts/CallContext.js
import React, { createContext, useContext, useState, useRef } from "react";

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [showIncomingCallModal, setShowIncomingCallModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(null);

  const value = {
    currentRoom,
    setCurrentRoom,
    isMuted,
    setIsMuted,
    isCameraOff,
    setIsCameraOff,
    isScreenSharing,
    setIsScreenSharing,
    incomingCall,
    setIncomingCall,
    showIncomingCallModal,
    setShowIncomingCallModal,
    showCallModal,
    setShowCallModal,
    error,
    setError,
    loading,
    setLoading,
    localStream,
    remoteStream,
    peerConnection,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = () => useContext(CallContext);
