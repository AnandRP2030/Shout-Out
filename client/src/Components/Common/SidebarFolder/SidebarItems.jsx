import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import { HStack, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FlyBird from "../../Icon/flyBird";

import {
  FcHome,
  FcBinoculars,
  FcSms,
  FcFilmReel,FcContacts,FcBookmark,FcAdvertising,FcLeft
} from "react-icons/all";

// bold

const SidbarItems = ({ label }) => {
  const navigate = useNavigate();
  const removeItemLs = () => {
    let token = localStorage.getItem("token") || "";
    if (token) {
      localStorage.removeItem("token");
    }
    navigate("/signup");
  };

  let Icons;
  if (label === "Home") {
    Icons = FcHome;
  } else if (label === "Explore") {
    Icons = FcBinoculars;
  } else if (label === "Entertainment") {
    Icons = FcFilmReel;
  } else if (label === "Notifications") {
    Icons = FcAdvertising;
  } else if (label === "Messages") {
    Icons = FcSms;
  } else if (label === "Bookmarks") {
    Icons = FcBookmark;
  } else if (label === "Shout Pro") {
    Icons = TwitterBlueSvg;
  } else if (label === "Signup") {
    Icons = FcContacts;
  } else if (label === "") {
    Icons = FlyBird;
  } else if (label === "Logout") {
    Icons = FcLeft;
  }

  const optionStyles = {
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background-color 0.3s",
    "&:hover": {
      bg: "#2c3640",
    },
  };

  
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
    } else if (label === "Signup") {
      navigate("/signup");
    } else if (label === "Logout") {
      removeItemLs();
    } else if (label === "") {
      navigate("/home");
    }
  };

  const textVisible = useBreakpointValue([
    false,
    false,
    false,
    false,
    true,
    true,
  ]);

  return (
    <HStack
      sx={optionStyles}
      w={["70%", "80%", "90%"]}
      h="50px"
      onClick={redirectPage}
    >
      <Icon boxSize={30} as={Icons} />
      {textVisible && (
        <Text fontSize={{ base: "18px", md: "20px", lg: "24px" }}>
          {label}{" "}
        </Text>
      )}
    </HStack>
  );
};

export default SidbarItems;
