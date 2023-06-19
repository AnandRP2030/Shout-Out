import SidbarItems from "./SidebarItems";
import { VStack, Spacer, Box, useBreakpointValue } from "@chakra-ui/react";
import TweetButton from "../Button/tweetBtn";
import ProfileBox from "../Profile/profileBox";

const SideBar = () => {

  const sidebarWidth = useBreakpointValue([[50, 50, 50, 50, 250, 280]])

  return (
    <>
      <VStack  pos="fixed" color="#fff" w={sidebarWidth}>
        <SidbarItems label={""} />
        <SidbarItems label={"Home"} />
        <SidbarItems label={"Explore"} />
        <SidbarItems label={"Entertainment"} />
        <SidbarItems label={"Notifications"} />
        <SidbarItems label={"Messages"} />
        <SidbarItems label={"Bookmarks"} />
        <SidbarItems label={"Shout Pro"} />
        <SidbarItems label={"Signup"} />
        <SidbarItems label={"Logout"} />
        <TweetButton colorCode={"#f91880"} content={"Shout"} />
        <Spacer />
     
        <ProfileBox />
      </VStack>
    </>
  );
};
export default SideBar;
