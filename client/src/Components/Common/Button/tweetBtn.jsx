import { Button } from "@chakra-ui/react";

const TweetButton = ({ colorCode, content }) => {
  const btnStyle = {
    height: "50px",
    width: "250px",
    fontSize: "1.5rem",
    color: "#fff",
    backgroundColor: colorCode,
    borderRadius: "50px"
  };

  return (
    <>
      <Button style={btnStyle}>{content}</Button>
    </>
  );
};
export default TweetButton;
