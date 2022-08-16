import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Discord Clone</title>
        <link rel="icon" href="/discord-icon.svg" />
      </Head>
      <div className="w-[90%]  flex flex-col justify-center items-center">
        <h1 className="text-gray-700 font-bold text-4xl my-4">
          Working on the Application which is going to be next discord.
        </h1>
        <p className="text-gray-500 text-lg w-[80%] font-semibold ">
          This is an open-source project which I (Aditya Painuli) started. The
          main aim of this project is to learn and build in public but also at
          the same time. I am trying to make this application the same as
          discord too much to the extend.{" "}
          <span className="text-gray-600 font-bold capitalize">
            Feel Free To Contribute In The Project If You Want To.
          </span>
        </p>
        <span className="text-blue-500 font-bold text-xl py-[2rem]">
          We will see to which extend we can copy discord developers work. 😆😆
        </span>
      </div>
      <div className="h-[1px] w-[500px] bg-gray-700 "></div>
      <div className="flex space-x-[4rem]">
        <div className="text-center">
          <h1 className="font-bold text-2xl my-4 text-green-500">
            Contribute Here 👇{" "}
          </h1>
          <Link href="https://github.com/AdityaPainuli/discord-clone">
            <Image
              src="/github.png"
              alt="github-logo"
              height={"100px"}
              width={"100px"}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="text-center">
          <h1 className="font-bold text-2xl my-4 text-blue-500">
            Have a talk with me? 👋{" "}
          </h1>
          <Link href="https://twitter.com/aditya_painuli">
            <Image
              src="/owner.jpg"
              alt="github-logo"
              height={"100px"}
              width={"100px"}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
