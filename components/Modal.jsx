import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../slices/newchannelModalSlice";
import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Modal = () => {
  const [email, setEmail] = useState("");
  const [serverName, setServerName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "Personal chat", user?.email, "Friend-list")),
      (snapshot) => {
        snapshot.docs.map((doc) => {
          const { FriendEmail } = doc.data();
          friendList.push(FriendEmail);
        });
      }
    );
  }, [db]);
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      console.log("if statement");
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
      console.log("normal statement");
    };
  };
  const addForOtherUser = async () => {
    await addDoc(collection(db, "Personal chat", email, "Friend-list"), {
      FriendEmail: user.email,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setEmail("");
        dispatch(closeModal());
      })
      .catch((error) => alert(error.message));
  };
  const sendUserMessageRequest = async () => {
    if (email === user.email) {
      return alert("Please give your friends email.");
    }
    friendList.map((friend) => console.log(friend));
    const existingFriend = friendList.includes(email);
    console.log(existingFriend);
    if (existingFriend) {
      alert(`You are already in conversation with ${email}`);
      setEmail("");
      dispatch(closeModal());
    } else {
      await addDoc(
        collection(db, "Personal chat", user?.email, "Friend-list"),
        {
          FriendEmail: email,
          timestamp: serverTimestamp(),
        }
      );
      addForOtherUser();
    }
  };
  return (
    <div className="w-[90%] relative z-[999] m-auto mt-[20px]">
      <div className="bg-gray-500  absolute  flex-col rounded-md shadow-md p-4 flex w-full">
        <div className="flex items-center justify-between w-[100%]">
          <h1 className="text-3xl font-bold ml-2">
            Create a Server or start a talk 🌟
          </h1>
          <button onClick={() => dispatch(closeModal())}>
            <XIcon
              height={30}
              width={30}
              className="text-[#333] hover:text-black"
            />
          </button>
        </div>
        <div className="mt-[2rem] flex flex-col justify-center">
          <div className="flex flex-col">
            <label htmlFor="email" className="signin_label">
              Email of your friend 👇 (Make sure this email is joined in
              Discord)
            </label>
            <input
              type="email"
              className="signin_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="bg-green-600 hover:bg-green-500 rounded-md p-2 w-max m-auto"
            onClick={sendUserMessageRequest}
          >
            Send Messaging Request📧
          </button>
        </div>
        <div className="flex items-center justify-center my-2 space-x-2">
          <div className="h-[1px] w-[200px] bg-gray-400" />
          <span>or</span>
          <div className="h-[1px] w-[200px] bg-gray-400" />
        </div>
        <div className="flex flex-col items-center justify-between w-[100%]">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold ml-2">
              Create your own Server 🚀⚡
            </h1>
            <p className="signin_label !font-medium my-2">
              Your Server is where you and your friends hang out. Make yours and
              start talking.{" "}
              <span className="font-bold">
                Really this can be a whole lot of fun 🙌
              </span>
            </p>
          </div>
          <div className="flex flex-col w-[100%] items-center">
            {/* Server Image */}
            <div>
              {selectedFile && (
                <div>
                  <img
                    src={selectedFile}
                    alt="group-logo"
                    className="h-20 rounded-full w-20 cursor-pointer "
                    onClick={() => setSelectedFile(null)}
                  />
                </div>
              )}
              {!selectedFile && (
                <div className="flex flex-col items-center justify-center">
                  <div
                    className="bg-gray-700 rounded-3xl cursor-pointer  h-[50px] w-[50px] flex items-center justify-center cursor-pointer"
                    onClick={() => filePickerRef.current.click()}
                  >
                    <Image
                      src={"/discord-logo.png"}
                      height={80}
                      width={120}
                      className="object-contain"
                    />

                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                    />
                  </div>
                  <span className=" text-sm my-2 text-gray-300">
                    Server photo( If not selected we will put a default unique
                    for you) 📷
                  </span>
                </div>
              )}
            </div>

            {/* Server name and description. */}
            <div className="flex flex-col justify-center w-[100%] mt-2">
              <div className="flex flex-col">
                <label htmlFor="servername" className="signin_label">
                  Your awesome server name 👀
                </label>
                <input
                  type="text"
                  className="signin_input"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="servername" className="signin_label">
                  Description for your Server ✍
                </label>
                <textarea
                  type="text"
                  className="signin_input max-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button className="bg-green-600 hover:bg-green-500 rounded-md p-2 w-max m-auto ">
                Create the Server ⚡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
