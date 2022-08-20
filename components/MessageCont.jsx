import React from "react";
import Image from "next/image";
import { user } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { channelState } from "../slices/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../backend/firebase";
import Moment from "react-moment";

const MessageCont = ({ message }) => {
  const currentChannel = useSelector(channelState);
  const [user] = useAuthState(auth);
  return (
    <div
      className={`flex  ${
        message.sender && "ml-auto"
      } my-2 w-max max-w-[400px] ${message.sender && "flex-row-reverse"} `}
    >
      <div className="rounded-full cursor-pointer hover:bg-gray-600 overflow-hidden mx-2 h-[40px] w-[40px]">
        <Image
          width={50}
          height={50}
          src={`https://avatars.dicebear.com/api/avataaars/${
            message.sender ? user.email : currentChannel
          }.svg`}
        />
      </div>
      <div>
        <div
          className={`${
            message.sender
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 hover:bg-gray-600"
          } flex-1 cursor-pointer text-white w-max rounded-md p-2`}
        >
          <span>{message.message}</span>
        </div>
        <span className="text-[12px] text-gray-300  ">
          <Moment fromNow>{message.timestamp?.toDate()}</Moment>
        </span>
      </div>
    </div>
  );
};

export default MessageCont;
