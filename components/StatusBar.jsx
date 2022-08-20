import { InformationCircleIcon, PhoneIcon } from "@heroicons/react/solid";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth } from "../backend/firebase";
import { channelState } from "../slices/channelSlice";

const StatusBar = () => {
  const currentChannel = useSelector(channelState);
  return (
    <div className="flex bg-gray-700 items-center justify-between w-full p-4 shadow-md">
      {currentChannel ? (
        <h1 className="text-xl font-semibold">
          Chat with:- <span className="font-bold">{currentChannel}</span>
        </h1>
      ) : (
        <h1 className="text-xl font-semibold">Welcome to Discord home</h1>
      )}
      <div className=" flex items-center space-x-4 ">
        <InformationCircleIcon className="h-7 w-7 hover:text-blue-500" />
        <PhoneIcon className="h-5 w-5 hover:text-blue-500" />
      </div>
    </div>
  );
};

export default StatusBar;
