import { Box, Button } from "@chakra-ui/react";

const TweetButton = ({ colorCode, content }) => {
  const btnStyle = {
    height: "45px",
    width: '80%',
    fontSize: "1.3rem",
    color: "#fff",
    backgroundColor: colorCode,
    borderRadius: "50px" ,
    
  };

  return (
    <>
      <Button style={btnStyle}>{content}</Button>
    </>
  );
};
export default TweetButton;
