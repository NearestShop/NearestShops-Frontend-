import { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";

import Hero from "./Hero";
import BestSellers from "./BestSellers";
import Features1 from "./Features1";
import Features2 from "./Features2";
import Features3 from "./Features3";
import NewArrivals from "./NewArrivals";
import Review from "./Review";
import Recommended from "./Recommended";
import TalkToChat from "./TalkToChat";
import NearYou from "./NearYou";

const HomePage = () => {
  const { userData } = useAppContext();

  useEffect(() => {
    document.title = `Nearest Shops`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <TalkToChat />
      {userData.loggedIn && <NearYou />}
      <BestSellers />
      <Features1 />
      <Features2 />
      {userData.loggedIn && <Recommended />}
      <Features3 />
      <NewArrivals />
      {/* <Review /> */}
    </>
  );
};

export default HomePage;
