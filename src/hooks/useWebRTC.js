// src/hooks/useWebRTC.js
import { useRef, useEffect } from "react";
import { db } from "../Firebase/firebase.config";
import { doc, getDoc, setDoc, collection, addDoc, deleteDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

const configuration = {
  iceServers: [
    { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] },
  ],
  iceCandidatePoolSize: 10,
};

export const useWebRTC = (localStreamRef, remoteStreamRef, setLoading, setError, peerConnectionRef) => {
  const pendingCandidates = useRef([]);

  const registerPeerConnectionListeners = () => {
    const pc = peerConnectionRef.current;
    if (!pc) return;

    pc.addEventListener("icegatheringstatechange", () => {
          });

    pc.addEventListener("connectionstatechange", () => {
          });

    pc.addEventListener("signalingstatechange", () => {
          });

    pc.addEventListener("iceconnectionstatechange", () => {
          });

    pc.addEventListener("track", (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStreamRef.current.addTrack(track);
      });
      if (remoteStreamRef.current) {
        remoteStreamRef.current.srcObject = remoteStreamRef.current;
      }
    });
  };

  const createRoom = async (roomIdRef) => {
    setLoading(true);
    try {
      const localStream = localStreamRef.current;
      if (!localStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
      }
      const pc = new RTCPeerConnection(configuration);
      peerConnectionRef.current = pc;
      registerPeerConnectionListeners();

      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current);
      });

      const roomRef = doc(db, "rooms", roomIdRef.current);
      const callerCandidatesCollection = collection(roomRef, "callerCandidates");

      pc.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          addDoc(callerCandidatesCollection, event.candidate.toJSON());
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      await setDoc(roomRef, { offer: { type: offer.type, sdp: offer.sdp } });

      pc.addEventListener("track", (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStreamRef.current.addTrack(track);
        });
        if (remoteStreamRef.current) {
          remoteStreamRef.current.srcObject = remoteStreamRef.current;
        }
      });

      onSnapshot(roomRef, async (snapshot) => {
        const data = snapshot.data();
        if (data?.answer) {
          const rtcSessionDescription = new RTCSessionDescription(data.answer);
          await pc.setRemoteDescription(rtcSessionDescription);
        }
      });

      onSnapshot(collection(roomRef, "calleeCandidates"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } catch (error) {
     // console.error("Error creating room:", error);
      setError("Error creating room");
    } finally {
      setLoading(false);
    }
  };

  const joinRoomById = async (roomId) => {
    setLoading(true);
    try {
      const localStream = localStreamRef.current;
      if (!localStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
      }
      const pc = new RTCPeerConnection(configuration);
      peerConnectionRef.current = pc;
      registerPeerConnectionListeners();

      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current);
      });

      const roomRef = doc(db, "rooms", roomId);
      const roomSnapshot = await getDoc(roomRef);

      if (roomSnapshot.exists()) {
        const offer = roomSnapshot.data().offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        await updateDoc(roomRef, { answer: { type: answer.type, sdp: answer.sdp } });

        onSnapshot(collection(roomRef, "callerCandidates"), (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const candidate = new RTCIceCandidate(change.doc.data());
              pc.addIceCandidate(candidate);
            }
          });
        });
      }
    } catch (error) {
     // console.error("Error joining room:", error);
      setError("Error joining room");
    } finally {
      setLoading(false);
    }
  };

  const hangUp = async (roomIdRef) => {
    const tracks = localStreamRef.current?.getTracks();
    tracks?.forEach((track) => track.stop());

    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.srcObject = null;
    }
    if (remoteStreamRef.current) {
      remoteStreamRef.current.srcObject = null;
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
  };

  return { createRoom, joinRoomById, hangUp };
};
