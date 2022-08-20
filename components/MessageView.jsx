import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../backend/firebase";
import { channelState } from "../slices/channelSlice";
import MessageCont from "./MessageCont";

const MessageView = () => {
  const currentChannel = useSelector(channelState);
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(
          db,
          "Personal chat",
          user.email,
          "Message-list",
          currentChannel,
          "messages"
        ),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setMessages(snapshot.docs)
    );
  }, [db, currentChannel]);
  return (
    <div>
      <div className="px-4 mt-[2rem] ">
        {messages.map((message, index) => (
          <MessageCont message={message.data()} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MessageView;
