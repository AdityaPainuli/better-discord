import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../backend/firebase";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { channelState, selectChannel } from "../slices/channelSlice";
import { modalState, openModal } from "../slices/newchannelModalSlice";
import Modal from "../components/Modal";
import StatusBar from "../components/StatusBar";
import Sidebar from "../components/Sidebar";
import MainMessage from "../components/MainMessage";
import AccountInfo from "../components/AccountInfo";
import RoomName from "../components/RoomName";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const currentChannel = useSelector(channelState);
  const modalStateValue = useSelector(modalState);
  const router = useRouter();
  return (
    <div className="flex bg-gray-800 text-white max-h-screen overflow-hidden">
      <Head>
        <title>Discord / Home</title>
        <link
          rel="shortcut icon"
          href="/discord-icon.svg"
          type="image/x-icon"
        />
      </Head>
      {/* Sidebar -for left side */}
      <Sidebar />
      {/* Primary*/}
      <div className="w-[95%] flex h-screen ">
        {/* Side-portion */}
        <div className=" hidden lg:flex justify-between flex-col lg:w-[20%]  bg-gray-600 h-screen">
          {/* Channel name and different rooms */}
          <RoomName />
          <AccountInfo />

          {/* Your status and information. */}
        </div>
        {/* Middle-portion */}
        <div className="relative lg:w-[80%] w-full pl-4 border-l-gray-800 border bg-gray-700">
          {modalStateValue && <Modal />}
          <StatusBar />

          <MainMessage />
        </div>
        {/* Right-portion */}
        <div className="bg-gray-600 h-screen"></div>
      </div>
    </div>
  );
};

export default HomePage;
