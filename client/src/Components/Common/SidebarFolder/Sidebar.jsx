import SidbarItems from "./SidebarItems";
import { Stack, HStack, VStack, Image, Spacer } from "@chakra-ui/react";
import TweetButton from "../Button/tweetBtn";
import ProfileBox from "../Profile/profileBox";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();


  return (
    <VStack ml="2%" pos="fixed" color="#fff">
      <SidbarItems label={""} />
      <SidbarItems label={"Home"} />
      <SidbarItems label={"Explore"} />
      <SidbarItems label={"Communites"} />
      <SidbarItems label={"Notifications"} />
      <SidbarItems label={"Messages"} />
      <SidbarItems label={"Bookmarks"} />
      <SidbarItems label={"Shout Pro"} />
      <SidbarItems label={"Profile"} />
      <SidbarItems label={"Logout"} />

      <TweetButton colorCode={"#f91880"} content={"Shout"} />

      <Spacer />
      <ProfileBox />
    </VStack>
  );
};
export default SideBar;
