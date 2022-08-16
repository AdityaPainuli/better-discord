import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../backend/firebase";
import Head from "next/head";
import { NextPage } from "next";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const homepage: NextPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="flex flex-col min-h-screen w-screen justify-center items-center">
      <Head>
        <title>Discord / Home</title>
      </Head>
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-center">
          Hello, {user?.displayName} 👋
        </h1>
        <button
          onClick={() => {
            signOut(auth);
            router.push("/signin");
          }}
          className="bg-blue-500 hover:bg-blue-400 w-max m-auto text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Log out{" "}
        </button>
      </div>
    </div>
  );
};

export default homepage;
