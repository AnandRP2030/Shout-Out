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
  Textarea,
  Button,
} from "@chakra-ui/react";
import React from "react";
import style from "../HomeTweets/tweet.module.css";
import style2 from "../homeFeed.module.css";
import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import { AiOutlineClose } from "react-icons/ai";
import { BsEmojiHeartEyes, BsImage } from "react-icons/bs";
import { CgPoll } from "react-icons/cg";
import { MdSchedule } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TWEET_EDITED } from "../../../Redux/ActionTypes/tweetActionTypes";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CommentBox = ({
  
  boxPosition,
  tweetInfo,
  setCommentBox,
  toggleCommentBox,
  index,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { name, username, profilePicture } = tweetInfo.tweetOwner;
  let { content } = tweetInfo;
  if (content.length > 100) {
    content = content.substring(0, 100);
    content += "...";
  }
  const [commentProgress, setCommentProgress] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const activeUserProPic = useSelector((state) => state.user.profilePicture);
  const dispatch = useDispatch();

  const newComment = async (e) => {
    e.stopPropagation();
    if (!commentContent) return;
    setCommentProgress(true);
    let res = await saveComment(commentContent);
    if (res.status === 201) {
      console.log("comment added");
      
      dispatch({ type: TWEET_EDITED });
      toggleCommentBox(index);
      setCommentProgress(false);
      setCommentBox(false);
      toast({
        duration: 1000,
        position: "bottom-center",
        render: () => (
          <Box color="white" p={3} bg="#f91880" borderRadius="10px">
            <Text textAlign="center" fontSize="1.2rem">
              {" "}
              Your Replay was sent.{" "}
            </Text>
          </Box>
        ),
      });
    } else {
      console.log(res);
    }


  };

  const saveComment = async (commentContent) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    let token = localStorage.getItem("token") || "";

    if (token) {
      token = token.replaceAll('"', "");
    } else {
      navigate("/signup");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let tweetId = tweetInfo.tweetId;
    const COMMENT_URL = `${BASE_URL}/user/tweets/comment/${tweetId}`;
    let res = await axios.patch(COMMENT_URL, { commentContent }, config);
    return res;
  };

  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box>
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ));
  return (
    <Box
      w={[350, 370, 490, 495, 500]}
      ml="-4rem"
      p={[5]}
      pos="absolute"
      top={boxPosition.top}
      className={style.commentBox}
    >
      <Grid templateColumns="repeat(10, 1fr)" gap={4}>
        <GridItem className={style.userProfilePicBox} colSpan={1}>
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
                  onClick={() => {
                    setCommentBox(false);
                    toggleCommentBox(index);
                  }}
                >
                  <Icon as={AiOutlineClose} boxSize={7} color="#b5aaaa" />{" "}
                </CustomCard>
              </Tooltip>
            </Box>
          </HStack>
        </GridItem>
        <GridItem colSpan={1}> </GridItem>
        <GridItem bg="#141e28" p={1} colSpan={9}>
          {content}
        </GridItem>
        <GridItem className={style.userProfilePicBox} colSpan={1}>
          <Image
            className={style.userProfilePic}
            src={activeUserProPic}
            alt="userProfilePic"
          />
        </GridItem>
        <GridItem h="120px" colSpan={9} mb={[14, 18]}>
          <Textarea
            value={commentContent}
            onChange={(e) => {
              e.stopPropagation();
              setCommentContent(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            h="120px"
            fontSize="1.2rem"
            letterSpacing={2}
            placeholder="Tweet your replay!"
          />

          <HStack className={style2.tweetLine} mt="20px">
            <HStack className={style2.tweetIcons}>
              <Icon as={BsImage} boxSize={5} />
              <Icon as={CgPoll} boxSize={5} />
              <Icon as={BsEmojiHeartEyes} boxSize={5} />
              <Icon as={MdSchedule} boxSize={5} />
              <Icon as={IoLocationOutline} boxSize={5} />
            </HStack>
            
            <Button
              
              isLoading={commentProgress}
              loadingText=""
              spinnerPlacement='end'
              fontSize={{ base: "1rem", md: "1.2rem", lg: "1.4rem" }}
              onClick={newComment}
              className={style2.tweetBtn}
            >
              Comment
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default CommentBox;
