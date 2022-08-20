import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "./Homepage";
import { auth } from "../backend/firebase";
import Signin from "./signin";

const Home: NextPage = () => {
  const [user, error, loading] = useAuthState(auth);
  if (!user) {
    return <Signin />;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
