import { Grid, GridItem, Text, HStack, Image, Box, Tooltip ,Tag, Icon } from "@chakra-ui/react";
import React from "react";
import style from "../HomeTweets/tweet.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import { AiOutlineClose, AiOutlineCloseSquare } from "react-icons/ai";

const CommentBox = ({boxPosition, setCommentBox}) => {
  
    const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
        <Box>
          <Tag ref={ref} {...rest}>
            {children}
          </Tag>
        </Box>
      ));

  return (
    <>
      <Grid
        templateColumns="repeat(10, 1fr)"
        gap={4}
        className={style.commentBox}
        pos='absolute'
        top={boxPosition.top}
        left={boxPosition.left}
      >

        <GridItem className={style.userProfilePicBox} colSpan={1}>
          <Image
            className={style.userProfilePic}
            src='https://pbs.twimg.com/profile_images/864282616597405701/M-FEJMZ0_400x400.jpg'
            alt="userProfilePic"
          />
        </GridItem>
        <GridItem colSpan={9} h="auto">
          <HStack className={style.tweetHeader}>
            <HStack>
              <Box>
                <Text className={style.nameText}> Name </Text>
              </Box>
              <Box>
                <TwitterBlueSvg height="25px" width="25px" />
              </Box>
              <Text className={style.usernameText}> username ·</Text>
              <Text className={style.timeText} ml="200px">
                {" "}
                {"1h"}{" "}
              </Text>
            </HStack>
            <Box>
              <Tooltip
                label="Close"
                bgColor="#f91880"
                openDelay={400}
                closeDelay={400}
              >
                <CustomCard
                  bgColor="transparent"
                  color="white"
                  onClick={() => setCommentBox(false)}
                >
                  <Icon as={AiOutlineClose} boxSize={7} color='#b5aaaa' />{" "}
                </CustomCard>
              </Tooltip>
            </Box>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};
export default CommentBox;
