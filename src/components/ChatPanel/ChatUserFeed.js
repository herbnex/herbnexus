import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ChatUserItem from "./ChatUserItem";
import useAuth from "../../../src/hooks/useAuth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../src/Firebase/firebase.config";

const ChatUserFeed = ({ setShowChatConvo, setSelectedSpecialist, selectedSpecialist }) => {
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("isOnline", "==", true));
      const querySnapshot = await getDocs(q);
      const fetchedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleClick = (specialist) => {
    setShowChatConvo(true);
    setSelectedSpecialist(specialist);
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
          {users.map(user => (
            <ChatUserItem
              key={user.id}
              field={"herbalist"}
              handleClick={() => handleClick(user)}
              lastSeen={"2hr"}
              name={user.name}
              imgUrl={user.imgUrl}
              isOnline={user.isOnline}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatUserFeed;
