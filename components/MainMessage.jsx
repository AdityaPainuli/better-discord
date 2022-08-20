import { CameraIcon, EmojiHappyIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../backend/firebase";
import { channelState } from "../slices/channelSlice";
import MessageView from "../components/MessageView";

const MainMessage = () => {
  const [user] = useAuthState(auth);
  const currentChannel = useSelector(channelState);
  const [message, setMessage] = useState("");
  const addMessageForOther = async () => {
    await addDoc(
      collection(
        db,
        "Personal chat",
        currentChannel,
        "Message-list",
        user?.email,
        "messages"
      ),
      {
        message: message,
        timestamp: serverTimestamp(),
        receiverName: currentChannel,
        sender: false,
      }
    );
  };
  const handleSendMessage = async () => {
    if (message === "") {
      return;
    }

    await addDoc(
      collection(
        db,
        "Personal chat",
        user?.email,
        "Message-list",
        currentChannel,
        "messages"
      ),
      {
        message: message,
        timestamp: serverTimestamp(),
        receiverName: currentChannel,
        sender: true,
      }
    );
    addMessageForOther();

    setMessage("");
  };
  return (
    <div className="w-[100%] h-[90%]  ">
      {/* Main Feed */}

      <div className="w-[100%] h-[90%]  overflow-y-scroll">
        {currentChannel && <MessageView />}
      </div>
      {/* Input Field */}
      {currentChannel && (
        <div className="bg-gray-500 rounded-md shadow-md w-[90%] h-[7%]  m-auto flex items-center">
          <div className="flex items-center">
            <CameraIcon className="h-7 w-7 m-4 cursor-pointer hover:text-blue-500 transition-all duration-300" />
            <EmojiHappyIcon className="h-7 w-7 cursor-pointer hover:text-blue-500 transition-all duration-300" />
          </div>
          <form
            className="w-[86%]"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type something..."
              className="bg-transparent w-full mr-2 h-full outline-none p-2"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default MainMessage;
