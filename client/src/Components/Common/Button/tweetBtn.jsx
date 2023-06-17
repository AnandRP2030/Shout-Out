import { Box, Button, Icon, useBreakpointValue } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
const TweetButton = ({ colorCode, content }) => {
  const btnStyle = {
    height: "45px",

    fontSize: "1.3rem",
    color: "#fff",
    backgroundColor: colorCode,
    borderRadius: "50px",
  };

  const largeBtn = useBreakpointValue([false, false, false, false, true, true]);
  return (
    <>
      {largeBtn ? (
        <Button w={["70%", "75%"]} style={btnStyle}>
          {content}
        </Button>
      ) : (
        <Button borderRadius="50%" bgColor={colorCode}>
          <Icon as={AiFillEdit} boxSize={3} />
        </Button>
      )}
    </>
  );
};
export default TweetButton;
