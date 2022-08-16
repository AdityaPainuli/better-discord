import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../backend/firebase";

const SignIn: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign-in the user with email-password.
  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        router.push("/homepage");
      })
      .catch((error) => alert(error.message));
  };

  // Resetting Password Sending Email .
  const getPasswordResetEmail = async () => {
    if (email === "") {
      alert("Please Input Email");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password send to registered Email");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Discord / Sign-in</title>
        <link
          rel="shortcut icon"
          href="/discord-icon.svg"
          type="image/x-icon"
        />
      </Head>
      <div>
        <Image
          src="/background.jpg"
          layout="fill"
          alt="background-img"
          className="absolute top-0 left-0 w-screen h-screen -z-10"
        />
        <div className="h-[600px] w-[550px] pt-[4rem] flex flex-col justify-center shadow-md bg-gray-700 rounded-md">
          <Image
            src="/discord-logo.png"
            alt="logo"
            height={"200px"}
            width={"300px"}
            className=" object-contain flex"
          />
          <div className="w-full h-full z-20  pb-[4rem]">
            <h1 className="text-white font-bold mt-4 text-center text-4xl">
              Welcome Back!
            </h1>
            <p className="text-gray-300 font-semibold text-md my-4 text-center">
              We're so exicted to see you again!
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signIn();
              }}
              className="flex flex-col w-[100%] "
            >
              <div className="flex flex-col">
                <label htmlFor="email" className="signin_label">
                  Email
                </label>
                <input
                  type="email"
                  className="signin_input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="signin_label">
                  Password
                </label>
                <input
                  type="password"
                  className="signin_input !mb-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={getPasswordResetEmail}
                  className="text-blue-400 w-max text-sm mb-[1rem] mt-[10px] ml-[2rem] hover:underline cursor-pointer"
                >
                  Forget Password?
                </span>
              </div>
              <button
                type={"submit"}
                onClick={signIn}
                className="bg-blue-600 text-white font-semibold text-center text-lg p-2 w-[80%] mx-auto cursor-pointer hover:bg-blue-500 rounded-md "
              >
                Login
              </button>
              <p className="w-max text-gray-400 mt-2 text-sm mb-[1rem] ml-[2rem] ">
                Need an Account{" "}
                <Link href="/signup">
                  <span className="text-blue-400 hover:underline cursor-pointer ">
                    Sign up?
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
