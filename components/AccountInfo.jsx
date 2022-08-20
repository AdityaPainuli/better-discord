import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../backend/firebase";
import {
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut } from "firebase/auth";

const AccountInfo = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="w-[100%] h-[60px] flex items-center  cursor-pointer p-2">
      <div className="rounded-full mx-2 h-[40px] w-[40px] overflow-hidden border border-gray-500">
        <Image
          src={`https://avatars.dicebear.com/api/avataaars/${user.email}.svg`}
          height={50}
          width={50}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h1 className="font-bold capitalize -mb-1">{user.displayName}</h1>
        <h1 className="font-semibold">{user?.email}</h1>
      </div>
      <DotsHorizontalIcon
        onClick={() => signOut(auth)}
        className="h-7 w-7 hover:bg-gray-900 rounded-full"
      />
    </div>
  );
};

export default AccountInfo;
