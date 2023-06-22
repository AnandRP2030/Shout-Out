import YouTube from "react-youtube-embed";
import { Box, Center } from "@chakra-ui/react";
import SideBar from "../Common/SidebarFolder/Sidebar";

const LiveDemo = () => {
  const videoId = "8xIobFsIOYA";
  return (
    <Box w="100%" minH="700px" bg="#15202b" pl='2%' h="100%">
      <SideBar />

      <Box pt="5%" ml='5%'>
        <Box
          w={["80%", "70%", "70%", "70%", "70%"]}
          m="auto"
          position="relative"
          height="0"
        >
          <YouTube id={videoId} />
        </Box>
      </Box>
    </Box>
  );
};

export default LiveDemo;
