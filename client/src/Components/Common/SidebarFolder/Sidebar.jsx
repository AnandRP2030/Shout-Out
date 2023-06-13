import SidbarItems from "./SidebarItems";
import { VStack, Spacer, Box } from "@chakra-ui/react";
import TweetButton from "../Button/tweetBtn";
import ProfileBox from "../Profile/profileBox";

const SideBar = () => {
  return (
    <>
      <VStack ml="2%" pos="fixed" color="#fff" w={[150, 180, 200, 250, 300]}>
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
    </>
  );
};
export default SideBar;
