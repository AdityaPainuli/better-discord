import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Discord Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-[90%]  flex flex-col justify-center items-center">
        <h1 className="text-gray-700 font-bold text-4xl my-4">
          Working on the Application which will look like discord clone.
        </h1>
        <p className="text-gray-500 text-lg w-[80%] font-semibold ">
          This is an open source project which I (aditya Painuli) started . The
          main aim of this project is to learn and build in public but also at
          the same time . I am trying to make this application same as discord
          to much of the extend{" "}
          <span className="text-green-500 font-bold capitalize">
            Feel free to contribute in the project if you want to.
          </span>
        </p>
        <span className="text-blue-500 font-bold text-xl py-[2rem]">
          We will see to which extend we can copy discord developers work. 😆😆
        </span>
      </div>
    </div>
  );
};

export default Home;
