import DogeSvg from "../../Icon/dogeSvg";
import HomeSvg from "../../Icon/homeSvg";
import HashSvg from "../../Icon/hashSvg";
import MoreSvg from "../../Icon/moreSvg";
import NotificationSvg from "../../Icon/notificationSvg";
import ProfileSvg from "../../Icon/profileSvg";
import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import MsgSvg from "../../Icon/messegesSvg";
import CommunitySvg from "../../Icon/communitySvg";
import BookmarkSvg from "../../Icon/bookmarkSvg";
import { HStack, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import SpinTwit from "../../Icon/spinTwit";
import { useNavigate } from "react-router-dom";
import FlyBird from "../../Icon/flyBird";

// bold
import HomeBoldSvg from "../../Icon/BoldSvg/homeBoldSvg";

const SidbarItems = ({ label }) => {
  const removeItemLs = () => {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }
    console.log("navigate");
    navigate("/login");
  };

  let Icon;
  if (label === "Home") {
    Icon = HomeBoldSvg;
    Icon = HomeSvg;
  } else if (label === "Explore") {
    Icon = HashSvg;
  } else if (label === "Communites") {
    Icon = CommunitySvg;
  } else if (label === "Notifications") {
    Icon = NotificationSvg;
  } else if (label === "Messages") {
    Icon = MsgSvg;
  } else if (label === "Bookmarks") {
    Icon = BookmarkSvg;
  } else if (label === "Shout Pro") {
    Icon = TwitterBlueSvg;
  } else if (label === "Profile") {
    Icon = ProfileSvg;
  } else if (label === "") {
    Icon = FlyBird;
  } else if (label === "Logout") {
    Icon = MoreSvg;
  }

  const optionStyles = {
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background-color 0.3s",
    "&:hover": {
      bg: "#2c3640",
    },
  };

  const navigate = useNavigate();
  const redirectPage = () => {
    if (label === "Home") {
      navigate("/home");
    } else if (label === "Explore") {
      navigate("/explore");
    } else if (label === "Communites") {
      navigate("/communities");
    } else if (label === "Notifications") {
      navigate("/notifications");
    } else if (label === "Messages") {
      navigate("/messages");
    } else if (label === "Bookmarks") {
      navigate("/bookmarks");
    } else if (label === "Twitter Blue") {
      navigate("/twitter_blue");
    } else if (label === "Profile") {
      navigate("/signup");
    } else if (label === "Logout") {
      removeItemLs();
      navigate("/home");
    } else if (label === "") {
      navigate("/home");
    }
  };

  const textVisible = useBreakpointValue([false, false, false, false, true, true])
  return (
    <HStack
      sx={optionStyles}
      w={["70%", "80%", "90%"]}
      h="50px"
      onClick={redirectPage}
    >
      <Icon />
    {textVisible && <Text fontSize={{ base: "18px", md: "20px", lg: "24px" }}>{label} </Text> }
      
    </HStack>
  );
};

export default SidbarItems;
