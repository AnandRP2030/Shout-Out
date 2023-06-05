import {
  Grid,
  GridItem,
  Text,
  HStack,
  Image,
  Box,
  Tooltip,
  Tag,
  Icon,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import React from "react";
import style from "../HomeTweets/tweet.module.css";
import style2 from "../homeFeed.module.css";

import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import { AiOutlineClose, AiOutlineCloseSquare } from "react-icons/ai";
import { BsEmojiHeartEyes, BsImage } from "react-icons/bs";
import { CgPoll } from "react-icons/cg";
import { MdSchedule } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const CommentBox = ({ boxPosition, tweetInfo, setCommentBox }) => {
  const { name, username, profilePicture } = tweetInfo.tweetOwner;
  const { content } = tweetInfo;


  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box>
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ));

  return (
    <Box pos="absolute" top={boxPosition.top} className={style.commentBox}>
      <Grid templateColumns="repeat(10, 1fr)" gap={4}>
        <GridItem className={style.userProfilePicBox} colSpan={1} >
          <Image
            className={style.userProfilePic}
            src={profilePicture}
            alt="userProfilePic"
          />
        </GridItem>
        <GridItem colSpan={9} h="auto">
          <HStack className={style.tweetHeader}>
            <HStack>
              <Box>
                <Text className={style.nameText}> {name} </Text>
              </Box>
              <Box>
                <TwitterBlueSvg height="25px" width="25px" />
              </Box>
              <Text className={style.usernameText}> {username} ·</Text>
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
                  <Icon as={AiOutlineClose} boxSize={7} color="#b5aaaa" />{" "}
                </CustomCard>
              </Tooltip>
            </Box>
          </HStack>
        </GridItem>
        <GridItem colSpan={1}> </GridItem>
        <GridItem bg='#141e28' p={1} colSpan={9}>{content}</GridItem>
        <GridItem className={style.userProfilePicBox} colSpan={1}>
          <Image
            className={style.userProfilePic}
            src={profilePicture}
            alt="userProfilePic"
          />
        </GridItem>
        <GridItem h='120px'  colSpan={9} >
          <Textarea h='120px' fontSize='1.2rem' letterSpacing={2}  placeholder="Tweet your replay!"/>
          
          <HStack className={style2.tweetLine} mt='20px'>
            <HStack className={style2.tweetIcons}>
              <Icon as={BsImage} boxSize={5} />
              <Icon as={CgPoll} boxSize={5} />
              <Icon as={BsEmojiHeartEyes} boxSize={5} />
              <Icon as={MdSchedule} boxSize={5} />
              <Icon as={IoLocationOutline} boxSize={5} />
            </HStack>
            <Button className={style2.tweetBtn}>
              {" "}
              Tweet{" "}
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default CommentBox;
