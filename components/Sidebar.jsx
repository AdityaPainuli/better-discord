import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../backend/firebase";
import Image from "next/image";
import { PlusSmIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { channelState, selectChannel } from "../slices/channelSlice";
import { openModal } from "../slices/newchannelModalSlice";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import SideAvatar from "../components/SideAvatar";

const Sidebar = () => {
  const currentChannel = useSelector(channelState);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [FriendList, setFriendList] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "Personal chat", user?.email, "Friend-list"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setFriendList(snapshot.docs)
    );
  }, [db]);
  return (
    <div className="w-[5%]  py-4 flex flex-col space-y-4 items-center   bg-gray-700 ">
      {/* <div
        className={`bg-gray-900 rounded-3xl p-2 h-[50px] w-[50px] cursor-pointer transition-all delay-300 ease-in-out hover:rounded-xl hover:bg-gray-800 ${
          currentChannel === "" && "rounded-xl bg-gray-800"
        }`}
        onClick={() => dispatch(selectChannel(""))}
      >
        <Image
          width={50}
          height={50}
          src={`/discord-logo.png`}
          className="object-contain"
        />
      </div> */}
      {FriendList.map((friend, index) => (
        <SideAvatar index={index} friend={friend.data()} />
      ))}
      <div className="channel-box group ">
        <PlusSmIcon
          className="text-green-500  group-hover:bg-green-500 group-hover:text-white"
          height={50}
          width={50}
          onClick={() => dispatch(openModal())}
        />
      </div>
      <div
        className={`rounded-3xl p-2 flex items-center justify-center cursor-pointer transition-all hover:bg-green-500 hover:rounded-xl bg-gray-400 ${
          currentChannel === "explore" && "active-channel"
        } `}
        onClick={() => dispatch(selectChannel("explore"))}
      >
        <Image
          src={"/compass.svg"}
          className="text-green-500  group-hover:bg-green-500 group-hover:text-white"
          height={30}
          width={30}
        />
      </div>
    </div>
  );
};

export default Sidebar;
